import test from 'node:test'
import assert from 'node:assert/strict'

import { transcriptMatchesExactly } from '../../src/lib/speechCascade.js'

test('exact herkend alfabetwoord hoeft geen docentcontrole', () => {
  const item = { nl: 'A', word: 'appel', answer: 'appel' }
  assert.equal(transcriptMatchesExactly(item, 'Appel'), true)
  assert.equal(transcriptMatchesExactly(item, 'appel.'), true)
  assert.equal(transcriptMatchesExactly(item, 'andere'), false)
})

test('onzekere transcriptie van cadeau blijft niet exact', () => {
  const item = { nl: 'C', word: 'cadeau', answer: 'cadeau' }
  assert.equal(transcriptMatchesExactly(item, 'Kaat u'), false)
})
