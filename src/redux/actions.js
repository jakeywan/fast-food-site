export const LOAD_NOUNS = 'LOAD_NOUNS'
export function loadNouns (nouns) {
  return {
    type: LOAD_NOUNS,
    nouns
  }
}

export const LOAD_POLY_NOUN = 'LOAD_POLY_NOUN'
export function loadPolyNoun (noun) {
  return {
    type: LOAD_POLY_NOUN,
    noun
  }
}

export const LOAD_WEARABLE = 'LOAD_WEARABLE'
export function loadWearable (wearable) {
  return {
    type: LOAD_WEARABLE,
    wearable
  }
}

export const LOAD_CLOTHING = 'LOAD_CLOTHING'
export function loadClothing (tokenId, clothesList) {
  return {
    type: LOAD_CLOTHING,
    tokenId,
    clothesList
  }
}

export const LOAD_SVGS = 'LOAD_SVGS'
export function loadSVGs (svgs) {
  return {
    type: LOAD_SVGS,
    svgs
  }
}

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS'
export function updateSettings (settings) {
  return {
    type: UPDATE_SETTINGS,
    settings
  }
}

export const UPDATE_WEARABLES = 'UPDATE_WEARABLES'
export function updateWearables (wearables) {
  return {
    type: UPDATE_WEARABLES,
    wearables
  }
}

export const TRY_WEARABLES = 'TRY_WEARABLES'
export function tryWearables (trying) {
  return {
    type: TRY_WEARABLES,
    trying
  }
}
