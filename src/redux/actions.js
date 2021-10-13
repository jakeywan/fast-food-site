export const LOAD_NOUNS = 'LOAD_NOUNS'
export function loadNouns (nouns) {
  return {
    type: LOAD_NOUNS,
    nouns
  }
}
