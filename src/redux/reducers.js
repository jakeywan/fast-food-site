import { initialStore } from './initialStore'
import {
  LOAD_NOUNS
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
    
    default:
      return state
  }
}

export default ffnApp
