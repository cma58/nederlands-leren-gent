const LETTERS = [
  ['A', 'aa', 'appel'], ['B', 'bee', 'bal'], ['C', 'cee', 'cadeau'], ['D', 'dee', 'deur'],
  ['E', 'ee', 'eend'], ['F', 'ef', 'fiets'], ['G', 'gee', 'geit'], ['H', 'haa', 'huis'],
  ['I', 'ie', 'iglo'], ['J', 'jee', 'jas'], ['K', 'kaa', 'kat'], ['L', 'el', 'lamp'],
  ['M', 'em', 'maan'], ['N', 'en', 'neus'], ['O', 'oo', 'oog'], ['P', 'pee', 'paard'],
  ['Q', 'kuu', 'quiz'], ['R', 'er', 'roos'], ['S', 'es', 'ster'], ['T', 'tee', 'tafel'],
  ['U', 'uu', 'uur'], ['V', 'vee', 'vis'], ['W', 'wee', 'water'], ['X', 'iks', 'taxi'],
  ['Y', 'i-grec', 'yoghurt'], ['Z', 'zet', 'zon'],
]

const PAIR_WORDS = ['man', 'maan', 'bos', 'boos', 'pit', 'piet', 'zon', 'zoon', 'vis', 'vies', 'pen', 'ben']
const FIRST_WORDS = [
  ['hallo', 'salam'], ['dag', 'salam / bslama'], ['ja', 'iyyeh'], ['nee', 'la'], ['dank-u', 'chokran'],
]

const DARIJA_INSTRUCTIONS = [
  ['listen', 'Sm3o mzyan.', 'Luister goed.'],
  ['choose', 'Khtaro l7arf s7i7.', 'Kies de juiste letter.'],
  ['tap-letter', 'Dghato 3la l7arf.', 'Tik op de letter.'],
  ['next', 'Dghato 3la li men be3d.', 'Tik op volgende.'],
  ['later', 'Ila mazal s3ib, khlliwh l morra jaya.', 'Als het nog moeilijk is, oefen dit later.'],
]

function dutchPrompt(id, category, text, label, order, maxDurationMs = 8000) {
  return {
    id,
    category,
    locale: 'nl-BE',
    text,
    label,
    translationNl: '',
    instructionNl: `Zeg exact: “${text}”`,
    instructionDarijaLat: `9olo bddabt: “${text}”`,
    maxDurationMs,
    order,
    requiredForLive: true,
  }
}

export const REFERENCE_AUDIO_PROMPTS = [
  ...LETTERS.map(([letter, name], index) => dutchPrompt(
    `letter-name-${letter.toLowerCase()}`,
    'letter-names',
    name,
    `${letter} — letternaam ${name}`,
    index + 1,
    5000,
  )),
  ...LETTERS.map(([letter, , word], index) => dutchPrompt(
    `letter-example-${letter.toLowerCase()}`,
    'letter-examples',
    `${letter} van ${word}`,
    `${letter} van ${word}`,
    index + 1,
    7000,
  )),
  ...PAIR_WORDS.map((word, index) => dutchPrompt(
    `pair-word-${word}`,
    'sound-pairs',
    word,
    `Klankwoord: ${word}`,
    index + 1,
    5000,
  )),
  ...FIRST_WORDS.map(([id, darijaLat], index) => dutchPrompt(
    `first-word-${id}`,
    'first-words',
    id === 'dank-u' ? 'dank u' : id,
    `${id === 'dank-u' ? 'dank u' : id} — ${darijaLat}`,
    index + 1,
    6000,
  )),
  ...DARIJA_INSTRUCTIONS.map(([id, text, translationNl], index) => ({
    id: `darija-instruction-${id}`,
    category: 'darija-instructions',
    locale: 'ary-MA',
    text,
    label: text,
    translationNl,
    instructionNl: `Laat dit natuurlijk inspreken door een Darija-spreker: “${text}”`,
    instructionDarijaLat: `Khlli chi wa7ed kayhder Darija ysejjelha b tari9a tabi3iya: “${text}”`,
    maxDurationMs: 8000,
    order: index + 1,
    requiredForLive: true,
  })),
]

export const REFERENCE_AUDIO_CATEGORIES = [
  { id: 'letter-names', titleNl: '26 letternamen', titleDarijaLat: '26 smiyat dyal l7orof' },
  { id: 'letter-examples', titleNl: '26 letters met voorbeeldwoord', titleDarijaLat: '26 7arf m3a kelmet l-mital' },
  { id: 'sound-pairs', titleNl: '12 woorden uit klankparen', titleDarijaLat: '12 kelma bach tferreq bin l-aswat' },
  { id: 'first-words', titleNl: '5 eerste woorden', titleDarijaLat: 'Awwel 5 kelmat' },
  { id: 'darija-instructions', titleNl: '5 gesproken Darija-instructies', titleDarijaLat: '5 ta3limat b Darija w s-sout' },
]

export const REFERENCE_AUDIO_BY_ID = new Map(REFERENCE_AUDIO_PROMPTS.map((prompt) => [prompt.id, prompt]))

export function referenceAudioPrompt(id) {
  return REFERENCE_AUDIO_BY_ID.get(String(id || '')) || null
}

export function letterNameAudioId(letter) {
  return `letter-name-${String(letter).toLowerCase()}`
}

export function letterExampleAudioId(letter) {
  return `letter-example-${String(letter).toLowerCase()}`
}

export function pairWordAudioId(word) {
  return `pair-word-${String(word).toLowerCase()}`
}
