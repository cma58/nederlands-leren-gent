import assert from 'node:assert/strict'
import test from 'node:test'
import worker from '../src/index.js'

function mockDb({ role = 'ADMIN' } = {}) {
  const state = { audio: null, attempts: 0 }
  return {
    state,
    prepare(sql) {
      let values = []
      return {
        bind(...nextValues) {
          values = nextValues
          return this
        },
        async first() {
          if (sql.includes('FROM auth_sessions')) {
            return { id: role === 'ADMIN' ? 'admin-1' : 'learner-1', role, status: 'ACTIVE', username: role.toLowerCase(), auth_session_id: 'session-1' }
          }
          if (sql.includes('SELECT attempts FROM auth_rate_limits')) return { attempts: state.attempts }
          if (sql.includes('SELECT version, updated_at FROM reference_audio')) {
            return state.audio ? { version: state.audio.version, updated_at: '2026-08-25 12:00:00' } : null
          }
          if (sql.includes('SELECT audio_blob, audio_mime')) return state.audio
          return null
        },
        async all() {
          if (sql.includes('FROM reference_audio')) return { results: state.audio ? [state.audio] : [] }
          return { results: [] }
        },
        async run() {
          if (sql.includes('INSERT INTO auth_rate_limits')) {
            state.attempts += 1
            return { meta: { changes: 1 } }
          }
          if (sql.includes('INSERT INTO reference_audio')) {
            state.audio = {
              prompt_id: values[0],
              category: values[1],
              locale: values[2],
              spoken_text: values[3],
              audio_mime: values[4],
              audio_blob: values[5],
              duration_ms: values[6],
              size_bytes: values[7],
              content_sha256: values[8],
              version: (state.audio?.version || 0) + 1,
              updated_at: '2026-08-25 12:00:00',
            }
            return { meta: { changes: 1 } }
          }
          if (sql.includes('DELETE FROM reference_audio')) {
            const changes = state.audio?.prompt_id === values[0] ? 1 : 0
            if (changes) state.audio = null
            return { meta: { changes } }
          }
          return { meta: { changes: 1 } }
        },
      }
    },
  }
}

function envWith(db) {
  return { DB: db, APP_ORIGIN: 'https://app.test' }
}

function request(path, options = {}) {
  return new Request(`https://app.test${path}`, options)
}

test('reference-audioroutes vereisen een actieve admin waar nodig', async () => {
  const noSession = await worker.fetch(request('/api/admin/reference-audio'), envWith(mockDb()), {})
  assert.equal(noSession.status, 401)

  const learner = await worker.fetch(request('/api/admin/reference-audio', {
    headers: { cookie: 'nl_session=test' },
  }), envWith(mockDb({ role: 'LEARNER' })), {})
  assert.equal(learner.status, 403)

  const wrongOrigin = await worker.fetch(request('/api/admin/reference-audio/letter-name-a', {
    method: 'DELETE',
    headers: { cookie: 'nl_session=test', origin: 'https://evil.example' },
  }), envWith(mockDb()), {})
  assert.equal(wrongOrigin.status, 403)
})

test('admin kan geldige audio uploaden, versie ophalen, afspelen en verwijderen', async () => {
  const db = mockDb()
  const env = envWith(db)
  const bytes = new Uint8Array(400)
  bytes.set([0x1a, 0x45, 0xdf, 0xa3])
  const form = new FormData()
  form.append('promptId', 'letter-name-a')
  form.append('durationMs', '1000')
  form.append('consentConfirmed', 'yes')
  form.append('audio', new File([bytes], 'letter-name-a.webm', { type: 'audio/webm' }))

  const uploaded = await worker.fetch(request('/api/admin/reference-audio', {
    method: 'POST',
    headers: { cookie: 'nl_session=test', origin: 'https://app.test' },
    body: form,
  }), env, {})
  assert.equal(uploaded.status, 201)
  assert.equal((await uploaded.json()).version, 1)
  assert.match(db.state.audio.content_sha256, /^[a-f0-9]{64}$/)

  const secondForm = new FormData()
  secondForm.append('promptId', 'letter-name-a')
  secondForm.append('durationMs', '900')
  secondForm.append('consentConfirmed', 'yes')
  secondForm.append('audio', new File([bytes], 'letter-name-a.webm', { type: 'audio/webm' }))
  const replaced = await worker.fetch(request('/api/admin/reference-audio', {
    method: 'POST',
    headers: { cookie: 'nl_session=test', origin: 'https://app.test' },
    body: secondForm,
  }), env, {})
  assert.equal(replaced.status, 201)
  assert.equal((await replaced.json()).version, 2)

  const listed = await worker.fetch(request('/api/admin/reference-audio', {
    headers: { cookie: 'nl_session=test' },
  }), env, {})
  const listBody = await listed.json()
  assert.equal(listBody.summary.recorded, 1)
  assert.equal(listBody.prompts.find((prompt) => prompt.id === 'letter-name-a').recorded, true)

  db.state.audio.spoken_text = 'oude prompt'
  const staleList = await worker.fetch(request('/api/admin/reference-audio', {
    headers: { cookie: 'nl_session=test' },
  }), env, {})
  const stalePrompt = (await staleList.json()).prompts.find((prompt) => prompt.id === 'letter-name-a')
  assert.equal(stalePrompt.recorded, false)
  assert.equal(stalePrompt.needsRerecording, true)
  const stalePlayback = await worker.fetch(request('/api/reference-audio/letter-name-a', {
    headers: { cookie: 'nl_session=test' },
  }), env, {})
  assert.equal(stalePlayback.status, 404)
  db.state.audio.spoken_text = 'aa'

  const played = await worker.fetch(request('/api/reference-audio/letter-name-a', {
    headers: { cookie: 'nl_session=test' },
  }), env, {})
  assert.equal(played.status, 200)
  assert.equal(played.headers.get('content-type'), 'audio/webm')
  assert.equal((await played.arrayBuffer()).byteLength, 400)

  const deleted = await worker.fetch(request('/api/admin/reference-audio/letter-name-a', {
    method: 'DELETE',
    headers: { cookie: 'nl_session=test', origin: 'https://app.test' },
  }), env, {})
  assert.equal(deleted.status, 200)
  assert.equal(db.state.audio, null)
})

test('verweesde audio blijft zichtbaar en kan door de admin worden gewist', async () => {
  const db = mockDb()
  db.state.audio = {
    prompt_id: 'oude-prompt',
    category: 'old',
    locale: 'nl-BE',
    spoken_text: 'oud',
    audio_mime: 'audio/webm',
    audio_blob: Uint8Array.from([0x1a, 0x45, 0xdf, 0xa3]),
    duration_ms: 1000,
    size_bytes: 400,
    version: 1,
    updated_at: '2026-08-25 12:00:00',
  }
  const env = envWith(db)
  const listed = await worker.fetch(request('/api/admin/reference-audio', {
    headers: { cookie: 'nl_session=test' },
  }), env, {})
  assert.deepEqual((await listed.json()).orphanedAudio.map((item) => item.promptId), ['oude-prompt'])
  const deleted = await worker.fetch(request('/api/admin/reference-audio/oude-prompt', {
    method: 'DELETE',
    headers: { cookie: 'nl_session=test', origin: 'https://app.test' },
  }), env, {})
  assert.equal(deleted.status, 200)
  assert.equal(db.state.audio, null)
})

test('upload weigert verkeerde container, ontbrekende toestemming en onbekende prompt', async () => {
  async function upload({ promptId = 'letter-name-a', consent = 'yes', bytes = new Uint8Array(400) }) {
    const form = new FormData()
    form.append('promptId', promptId)
    form.append('durationMs', '1000')
    form.append('consentConfirmed', consent)
    form.append('audio', new File([bytes], 'clip.webm', { type: 'audio/webm' }))
    return worker.fetch(request('/api/admin/reference-audio', {
      method: 'POST',
      headers: { cookie: 'nl_session=test', origin: 'https://app.test' },
      body: form,
    }), envWith(mockDb()), {})
  }

  assert.equal((await upload({})).status, 400)
  const validWebm = new Uint8Array(400)
  validWebm.set([0x1a, 0x45, 0xdf, 0xa3])
  assert.equal((await upload({ bytes: validWebm, consent: 'no' })).status, 400)
  assert.equal((await upload({ bytes: validWebm, promptId: 'unknown' })).status, 400)
})
