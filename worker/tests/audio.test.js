import test from 'node:test'
import assert from 'node:assert/strict'
import { d1BlobToBytes } from '../src/index.js'

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
