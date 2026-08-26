import curriculum from '../data/curriculum.js'

const LESSON_ALIASES = curriculum.levels.flatMap((level) => level.modules).flatMap((module) => module.lessons)
  .filter((lesson) => lesson.legacyLessonIds?.length)
  .map((lesson) => ({ id: lesson.id, legacyIds: lesson.legacyLessonIds }))

export function expandLegacyCompletion(value = {}) {
  const completed = { ...value }
  let changed = false
  for (const lesson of LESSON_ALIASES) {
    if (!completed[lesson.id] && lesson.legacyIds.some((legacyId) => completed[legacyId])) {
      completed[lesson.id] = true
      changed = true
    }
  }
  return { completed, changed }
}
