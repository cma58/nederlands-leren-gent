import assert from 'node:assert/strict'
import test from 'node:test'
import curriculum, { allLessonIds, countLessons } from '../../src/data/curriculum.js'

const level0 = curriculum.levels.find((level) => level.id === 'niveau-0')
const beginnerLessons = level0.modules.flatMap((module) => module.lessons)

test('beginnersroute starts practical and interweaves alphabet', () => {
  assert.equal(beginnerLessons[0].id, '0.start.1')
  assert.equal(beginnerLessons[0].items[0].nl, 'hallo')
  assert.equal(beginnerLessons[2].type, 'alphabet-overview')
  assert.equal(beginnerLessons[3].type, 'alphabet')
  assert.ok(beginnerLessons.findIndex((lesson) => lesson.id === '0.self.1') < beginnerLessons.findIndex((lesson) => lesson.id === '0.3.1'))
})

test('all 26 letters have one graded learning card with explicit name and example', () => {
  const letters = beginnerLessons.filter((lesson) => lesson.type === 'alphabet').flatMap((lesson) => lesson.items)
  assert.equal(letters.length, 26)
  assert.equal(new Set(letters.map((item) => item.letter)).size, 26)
  assert.deepEqual(letters.map((item) => item.letter).join(''), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  assert.deepEqual(
    letters.map((item) => item.letterName),
    ['aa', 'bee', 'cee', 'dee', 'ee', 'ef', 'gee', 'haa', 'ie', 'jee', 'kaa', 'el', 'em', 'en', 'oo', 'pee', 'kuu', 'er', 'es', 'tee', 'uu', 'vee', 'wee', 'iks', 'i-grec / Griekse ij', 'zet'],
  )
  for (const item of letters) {
    assert.ok(item.lowercase)
    assert.ok(item.letterName)
    assert.ok(item.exampleWord)
    assert.ok(item.speakPrompt)
    assert.equal(item.speakPrompt, `${item.letter} van ${item.exampleWord}`)
  }
})

test('letters never use automatic speaking assessment', () => {
  const letterLessons = beginnerLessons.filter((lesson) => lesson.items.some((item) => item.letter))
  assert.ok(letterLessons.length >= 6)
  assert.ok(letterLessons.every((lesson) => ['alphabet', 'alphabet-overview', 'name-spelling'].includes(lesson.type)))
})

test('beginner micro-lessons stay small and unsafe pseudo-pairs are absent', () => {
  const normalLessons = beginnerLessons.filter((lesson) => !['alphabet-overview', 'name-spelling'].includes(lesson.type))
  assert.ok(normalLessons.every((lesson) => lesson.items.length <= 6))
  const pairs = beginnerLessons.flatMap((lesson) => lesson.items).map((item) => `${item.nl}|${item.pair || ''}`)
  assert.ok(!pairs.includes('bus|buur'))
  assert.ok(!pairs.includes('trein|tijd'))
  assert.ok(!pairs.includes('koud|blauw'))
})

test('level 0 learner data is Dutch and Darija Latin only', () => {
  assert.equal(/[\u0600-\u06ff]/.test(JSON.stringify(level0)), false)
})

test('lesson ids stay unique across the curriculum', () => {
  const ids = curriculum.levels.flatMap((level) => level.modules.flatMap((module) => module.lessons.map((lesson) => lesson.id)))
  assert.equal(new Set(ids).size, ids.length)
})

test('visible beginner lesson numbers are unique and increasing per module', () => {
  const allDisplayIds = []
  for (const module of level0.modules) {
    const ids = module.lessons.map((lesson) => lesson.displayId)
    assert.equal(new Set(ids).size, ids.length)
    assert.deepEqual(ids, [...ids].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })))
    allDisplayIds.push(...ids)
  }
  assert.equal(new Set(allDisplayIds).size, allDisplayIds.length)
})

test('optional pronunciation does not block full level progress', () => {
  const requiredIds = allLessonIds(level0)
  const optionalIds = level0.modules.filter((module) => module.optional).flatMap((module) => module.lessons.map((lesson) => lesson.id))
  assert.ok(optionalIds.length > 0)
  assert.ok(optionalIds.every((id) => !requiredIds.includes(id)))
  assert.equal(requiredIds.length, countLessons(level0))
})

test('question words and sound pairs match the beginner review', () => {
  const questionLesson = beginnerLessons.find((lesson) => lesson.id === '0.4.1')
  assert.deepEqual(questionLesson.items.map((item) => item.nl), ['Wat?', 'Waar?', 'Wie?', 'Hoe?', 'Hoeveel?'])
  const pairLesson = beginnerLessons.find((lesson) => lesson.id === '0.1.0')
  assert.deepEqual(pairLesson.items.map((item) => `${item.nl}|${item.pair}`), ['man|maan', 'bos|boos', 'pit|piet', 'zon|zoon', 'vis|vies', 'pen|ben'])
  assert.ok(pairLesson.items.every((item) => item.noSlowAudio === true))
  assert.ok(!JSON.stringify(pairLesson).includes('Vlaamse g'))
})

test('old assigned lesson ids have a destination', () => {
  const aliases = new Set(beginnerLessons.flatMap((lesson) => lesson.legacyLessonIds || []))
  for (const oldId of ['0.1.1', '0.1.2', '0.1.3', '0.1.4', '0.2.3', '0.3.2']) assert.ok(aliases.has(oldId))
  const level1Aliases = new Set(curriculum.levels.find((level) => level.id === 'niveau-1').modules.flatMap((module) => module.lessons.flatMap((lesson) => lesson.legacyLessonIds || [])))
  assert.ok(level1Aliases.has('0.4.2'))
  assert.ok(level1Aliases.has('0.4.3'))
})
