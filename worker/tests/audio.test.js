import test from 'node:test'
import assert from 'node:assert/strict'
import { audioContainerMatches, d1BlobToBytes, detectAudioContainer } from '../src/index.js'
import { playReferenceAudio, stopReferenceAudio } from '../../src/lib/referenceAudio.js'

test('D1 BLOB-nummerarray wordt opnieuw binaire audio', () => {
  const bytes = d1BlobToBytes([26, 69, 223, 163])
  assert.ok(bytes instanceof Uint8Array)
  assert.deepEqual([...bytes], [26, 69, 223, 163])
})

test('ArrayBuffer blijft bytegetrouw bij audioweergave', () => {
  const source = Uint8Array.from([79, 103, 103, 83])
  const bytes = d1BlobToBytes(source.buffer)
  assert.deepEqual([...bytes], [...source])
})

test('ontbrekende of lege audio wordt niet als bestand aangeboden', () => {
  assert.equal(d1BlobToBytes(null), null)
  assert.equal(d1BlobToBytes([]).byteLength, 0)
})

test('vaste lesaudio controleert de echte container en niet alleen de MIME', () => {
  const webm = Uint8Array.from([0x1a, 0x45, 0xdf, 0xa3, 0, 0, 0, 0])
  const ogg = new TextEncoder().encode('OggS0000')
  const wav = new TextEncoder().encode('RIFF0000WAVE')
  const mp4 = new TextEncoder().encode('0000ftypM4A ')
  const mp3 = new TextEncoder().encode('ID300000')
  assert.equal(detectAudioContainer(webm), 'webm')
  assert.equal(detectAudioContainer(ogg), 'ogg')
  assert.equal(detectAudioContainer(wav), 'wav')
  assert.equal(detectAudioContainer(mp4), 'mp4')
  assert.equal(detectAudioContainer(mp3), 'mpeg')
  assert.equal(audioContainerMatches('audio/webm', webm), true)
  assert.equal(audioContainerMatches('audio/ogg', webm), false)
  assert.equal(audioContainerMatches('audio/webm', new TextEncoder().encode('<script>')), false)
})

test('mislukte vaste audio én TTS rapporteren played false', async () => {
  const originalWindow = globalThis.window
  const originalAudio = globalThis.Audio
  const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator')
  class BrokenAudio {
    pause() {}
    play() { return Promise.reject(new Error('geen audio')) }
  }
  globalThis.window = {}
  globalThis.Audio = BrokenAudio
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { onLine: true } })
  try {
    const result = await playReferenceAudio('letter-name-a', 'aa')
    assert.equal(result.played, false)
    assert.equal(result.source, 'unavailable')
    const darija = await playReferenceAudio('darija-instruction-listen', '', { fallbackToTts: false })
    assert.equal(darija.played, false)
  } finally {
    stopReferenceAudio()
    if (originalWindow === undefined) delete globalThis.window
    else globalThis.window = originalWindow
    if (originalAudio === undefined) delete globalThis.Audio
    else globalThis.Audio = originalAudio
    if (navigatorDescriptor) Object.defineProperty(globalThis, 'navigator', navigatorDescriptor)
    else delete globalThis.navigator
  }
})
