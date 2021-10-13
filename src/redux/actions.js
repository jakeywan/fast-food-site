export const LOAD_NOUNS = 'LOAD_NOUNS'
export function loadNouns (nouns) {
  return {
    type: LOAD_NOUNS,
    nouns
  }
}

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS'
export function updateSettings (settings) {
  return {
    type: UPDATE_SETTINGS,
    settings
  }
}
