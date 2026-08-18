import test from 'node:test'
import assert from 'node:assert/strict'

import {
  coachInput,
  fallbackCoach,
  parseCoachResult,
  validateCoachResponse,
} from '../src/coach.js'

const validResponse = {
  meaning: { nl: 'Een appel is fruit.', darijaLat: 'Tffa7a hiya fakha.' },
  usage: { nl: 'Je gebruikt dit woord bij eten.', darijaLat: 'Katsta3mel had lkelma m3a lmakla.' },
  examples: [
    { nl: 'Ik eet een appel.', darijaLat: 'Ana kanakel tffa7a.' },
    { nl: 'De appel is rood.', darijaLat: 'Tffa7a 7amra.' },
  ],
  commonMistake: { nl: 'Zeg het als één woord.', darijaLat: 'Golha kelma wa7da.' },
  memoryTip: { nl: 'Denk aan rood fruit.', darijaLat: 'Fekker f fakha 7amra.' },
  pronunciationTip: { nl: 'Open je mond rustig.', darijaLat: '7ell femmek b chwia.' },
}

test('coach gebruikt uitsluitend een bestaand lesitem als invoer', () => {
  const input = coachInput({ lessonId: '0.0.1', itemIndex: 0, mode: 'WORD' })
  assert.equal(input.item.target, 'appel')
  assert.equal(input.item.darijaLat, 'tffa7a')
  assert.equal(coachInput({ lessonId: 'niet-bestaand', itemIndex: 0, mode: 'WORD' }), null)
  assert.equal(coachInput({ lessonId: '0.0.1', itemIndex: 999, mode: 'WORD' }), null)
  assert.equal(coachInput({ lessonId: '0.0.1', itemIndex: 0, mode: 'VRIJE_PROMPT' }), null)
})

test('coach valideert tweetalige gestructureerde uitvoer', () => {
  assert.deepEqual(validateCoachResponse(validResponse), validResponse)
  assert.deepEqual(parseCoachResult({ response: `\`\`\`json\n${JSON.stringify(validResponse)}\n\`\`\`` }), validResponse)
  assert.equal(validateCoachResponse({
    ...validResponse,
    meaning: { nl: 'Een appel is fruit.', darijaLat: 'تفاحة' },
  }), null)
})

test('ingebouwde fallback bevat alleen Darija in Latijnse letters', () => {
  const input = coachInput({ lessonId: '0.0.1', itemIndex: 0, mode: 'PRONUNCIATION' })
  const result = fallbackCoach(input.item, input.mode)
  const darijaValues = [
    result.meaning.darijaLat,
    result.usage.darijaLat,
    ...result.examples.map((item) => item.darijaLat),
    result.commonMistake.darijaLat,
    result.memoryTip.darijaLat,
    result.pronunciationTip.darijaLat,
  ]
  assert.equal(darijaValues.some((value) => /[\u0600-\u06ff]/u.test(value)), false)
  assert.match(result.pronunciationTip.nl, /Mond wijd open/)
})
