import assert from 'node:assert/strict'
import test from 'node:test'
import { expandLegacyCompletion } from '../../src/lib/progressAliases.js'

test('oude voltooide les 0.3.2 voltooit de nieuwe les 0.3.1b', () => {
  const result = expandLegacyCompletion({ '0.3.2': true })
  assert.equal(result.changed, true)
  assert.equal(result.completed['0.3.1b'], true)
  assert.equal(result.completed['0.3.2'], true)
})

test('oude voltooide huisles 0.4.2 voltooit de verplaatste les 1.0.2', () => {
  const result = expandLegacyCompletion({ '0.4.2': true })
  assert.equal(result.changed, true)
  assert.equal(result.completed['1.0.2'], true)
})

test('aliasmigratie is idempotent', () => {
  const first = expandLegacyCompletion({ '0.3.2': true })
  const second = expandLegacyCompletion(first.completed)
  assert.equal(second.changed, false)
  assert.deepEqual(second.completed, first.completed)
})
