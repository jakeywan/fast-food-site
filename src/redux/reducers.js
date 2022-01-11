import { initialStore } from './initialStore'
import {
  LOAD_NOUNS,
  LOAD_POLY_NOUN,
  UPDATE_SETTINGS,
  LOAD_CLOTHING,
  LOAD_SVGS,
  UPDATE_WEARABLES,
  LOAD_WEARABLE,
  TRY_WEARABLES
} from './actions'

function ffnApp (state = initialStore, action) {
  switch (action.type) {
    case LOAD_NOUNS:
      return Object.assign({}, state, {
        nouns: {
          byId: {
            ...action.nouns
          },
          allIds: [...Object.keys(action.nouns)]
        }
      })
    case LOAD_POLY_NOUN:
      return Object.assign({}, state, {
        polyNouns: {
          byId: {
            ...state.polyNouns.byId,
            [action.noun.id]: action.noun
          },
          allIds: [...state.polyNouns.allIds, action.noun.id]
        }
      })
    case UPDATE_SETTINGS:
      return Object.assign({}, state, {
        settings: { ...action.settings }
      })
    case LOAD_CLOTHING:
      return Object.assign({}, state, {
        clothingStatesById: {
          ...state.clothingStatesById,
          [action.tokenId]: action.clothesList
        }
      })
    case LOAD_SVGS:
      return Object.assign({}, state, {
        svgsById: {
          ...action.svgs
        }
      })
    case UPDATE_WEARABLES:
      return Object.assign({}, state, {
        wearables: {
          ...action.wearables
        }
      })
    case LOAD_WEARABLE:
      return Object.assign({}, state, {
        wearables: {
          byId: {
            ...state.wearables.byId,
            [action.wearable.id]: action.wearable
          },
          allIds: [...state.wearables.allIds, action.wearable.id]
        }
      })
    case TRY_WEARABLES:
      return Object.assign({}, state, {
        tryingWearables: { ...action.trying }
      })
    default:
      return state
  }
}

export default ffnApp
