import { initialStore } from './initialStore'
import {
  LOAD_NOUNS, UPDATE_SETTINGS
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
    case UPDATE_SETTINGS:
      return Object.assign({}, state, {
        settings: { ...action.settings }
      })
    default:
      return state
  }
}

export default ffnApp
