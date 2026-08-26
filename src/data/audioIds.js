function normalizedAudioText(text) {
  return String(text || '').normalize('NFKC').trim().replace(/\s+/g, ' ')
}

function slug(text) {
  return normalizedAudioText(text)
    .toLocaleLowerCase('nl-BE')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48) || 'tekst'
}

function fnv1a(text) {
  let hash = 0x811c9dc5
  for (const character of normalizedAudioText(text).toLocaleLowerCase('nl-BE')) {
    hash ^= character.codePointAt(0)
    hash = Math.imul(hash, 0x01000193)
  }
  return (hash >>> 0).toString(36).padStart(7, '0')
}

export function lessonAudioId(text) {
  const normalized = normalizedAudioText(text)
  return normalized ? `lesson-${slug(normalized)}-${fnv1a(normalized)}` : ''
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

export { normalizedAudioText }
