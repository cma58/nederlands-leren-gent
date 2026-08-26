import assert from 'node:assert/strict'
import test from 'node:test'
import {
  REFERENCE_AUDIO_BY_ID,
  REFERENCE_AUDIO_CATEGORIES,
  REFERENCE_AUDIO_PROMPTS,
  letterExampleAudioId,
  letterNameAudioId,
  pairWordAudioId,
  referenceAudioPrompt,
} from '../../src/data/referenceAudio.js'

test('reference audio manifest has 585 unique, safe prompts', () => {
  assert.equal(REFERENCE_AUDIO_PROMPTS.length, 585)
  assert.equal(REFERENCE_AUDIO_BY_ID.size, 585)
  assert.equal(new Set(REFERENCE_AUDIO_PROMPTS.map((prompt) => prompt.id)).size, 585)
  for (const prompt of REFERENCE_AUDIO_PROMPTS) {
    assert.match(prompt.id, /^[a-z0-9-]+$/)
    assert.ok(['nl-BE', 'ary-MA'].includes(prompt.locale))
    assert.ok(prompt.text)
    assert.ok(prompt.maxDurationMs >= 5000 && prompt.maxDurationMs <= 10_000)
    assert.equal(prompt.requiredForLive, true)
    assert.equal(/[\u0600-\u06ff]/.test(JSON.stringify(prompt)), false)
  }
})

test('niveau 1 en 2 zijn per module georganiseerd en blijven binnen de gratis opslaggrens', () => {
  const lessonPrompts = REFERENCE_AUDIO_PROMPTS.filter((prompt) => prompt.id.startsWith('lesson-'))
  assert.equal(lessonPrompts.length, 511)
  assert.ok(lessonPrompts.every((prompt) => prompt.maxSizeBytes === 300_000))
  assert.equal(REFERENCE_AUDIO_CATEGORIES.length, 24)
  assert.ok(REFERENCE_AUDIO_CATEGORIES.some((category) => category.titleNl === 'Niveau 1 · Uitbreiding na niveau 0'))
  assert.ok(REFERENCE_AUDIO_CATEGORIES.some((category) => category.titleNl.startsWith('Niveau 2 · ')))
})

test('reference audio categories contain the agreed recordings', () => {
  const counts = Object.fromEntries(
    ['letter-names', 'letter-examples', 'sound-pairs', 'first-words', 'darija-instructions']
      .map((category) => [category, REFERENCE_AUDIO_PROMPTS.filter((prompt) => prompt.category === category).length]),
  )
  assert.deepEqual(counts, {
    'letter-names': 26,
    'letter-examples': 26,
    'sound-pairs': 12,
    'first-words': 5,
    'darija-instructions': 5,
  })
})

test('audio id helpers resolve to known prompts', () => {
  for (const letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    assert.ok(referenceAudioPrompt(letterNameAudioId(letter)))
    const example = referenceAudioPrompt(letterExampleAudioId(letter))
    assert.ok(example)
    assert.match(example.text, new RegExp(`^${letter} van `))
  }
  for (const word of ['man', 'maan', 'bos', 'boos', 'pit', 'piet', 'zon', 'zoon', 'vis', 'vies', 'pen', 'ben']) {
    assert.equal(referenceAudioPrompt(pairWordAudioId(word))?.text, word)
  }
  assert.equal(referenceAudioPrompt('does-not-exist'), null)
})
