import { ethers } from 'ethers'
import web3 from 'web3'
import store from '../redux/store'
import { descriptorContractFactory } from '../utilities/descriptorContractFactory'
import { nounsDescriptorFactory } from '../utilities/nounsDescriptorContractFactory'
import { nounsWearables } from '../wearables/nounsWearables'
import { customWearables } from '../wearables/customWearables'
import { updateWearables } from '../redux/actions'

export const fetchAllWearables = async () => {
  // let ffnDescriptor = await descriptorContractFactory()
  // let nounsDescriptor = await nounsDescriptorFactory()
  const nc = nounsWearables.images
  const cw = customWearables.images
  // TODO: load additional custom wearables as well
  let finalClothes = {
    nounsBodies: nc.bodies,
    nounsAccessories: nc.accessories,
    nounsGlasses: nc.glasses,
    customBodies: cw.customBodies,
    customAccessories: [],
    customGlasses: cw.customGlasses,
    customHats: cw.customHats,
    customBackgrounds: [],
    customOverlays: []
  }
  store.dispatch(updateWearables(finalClothes))
}