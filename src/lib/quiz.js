import { lessonAudioId } from '../data/audioIds.js'

/**
 * Maakt automatisch meerkeuzevragen uit de items van een les.
 * Werkt volledig lokaal — geen API of internet nodig.
 *
 * Twee soorten vragen:
 *  1) Vertaalvragen: toon de Darija in Latijnse letters of het cijfer en kies
 *     het juiste Nederlandse woord.
 *  2) de/het-vragen: toon het woord, kies het juiste lidwoord.
 */

/** Door de war schudden (Fisher–Yates), geeft een nieuwe array terug. */
export function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Aanwijzing voor een vertaalvraag, of null als het item niet bruikbaar is. */
function translatePrompt(item, lessonType) {
  if (lessonType === 'numbers' && typeof item.value === 'number') {
    return { text: String(item.value), rtl: false }
  }
  if (item.darijaLat) return { text: item.darijaLat, rtl: false }
  return null
}

export function buildQuiz(lesson) {
  const questions = []

  // 1) Vertaalvragen (Darija/cijfer -> Nederlands)
  const seen = new Set()
  const usable = lesson.items.filter((item) => {
    if (!item.nl || seen.has(item.nl)) return false
    if (!translatePrompt(item, lesson.type)) return false
    seen.add(item.nl)
    return true
  })
  if (usable.length >= 3) {
    const allAnswers = usable.map((i) => i.nl)
    for (const item of shuffle(usable)) {
      const { text, rtl } = translatePrompt(item, lesson.type)
      const distractors = shuffle(allAnswers.filter((a) => a !== item.nl)).slice(0, 3)
      questions.push({
        labelKey: 'quizPrompt',
        prompt: text,
        rtl,
        answer: item.nl,
        say: item.nl,
        audioId: item.audioId || lessonAudioId(item.nl),
        options: shuffle([item.nl, ...distractors]),
      })
    }
  }

  // 2) de/het-vragen (op basis van het lidwoord)
  const seenArt = new Set()
  const artItems = lesson.items.filter((item) => {
    if (item.article !== 'de' && item.article !== 'het') return false
    if (!item.nl || seenArt.has(item.nl)) return false
    seenArt.add(item.nl)
    return true
  })
  for (const item of shuffle(artItems).slice(0, 5)) {
    questions.push({
      labelKey: 'quizArticlePrompt',
      prompt: item.nl,
      rtl: false,
      answer: item.article,
      say: `${item.article} ${item.nl}`,
      audioId: lessonAudioId(`${item.article} ${item.nl}`),
      options: ['de', 'het'],
    })
  }

  // Alleen een quiz tonen als er genoeg vragen zijn.
  if (questions.length < 3) return []
  return shuffle(questions)
}
