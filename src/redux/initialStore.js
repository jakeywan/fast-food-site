export const initialStore = {
  nouns: {
    byId: {},
    allIds: []
  },
  polyNouns: {
    byId: {},
    allIds: []
  },
  svgsById: {},
  clothingStatesById: {},
  settings: {
    selectedNounId: '',
    backgroundColor: '',
    connectedAddress: ''
  },
  wearables: {
    nounsBodies: [],
    nounsAccessories: [],
    nounsGlasses: [],
    customBodies: [],
    customAccessories: [],
    customGlasses: [],
    customHats: [],
    customBackgrounds: [],
    customOverlays: []
  }
}