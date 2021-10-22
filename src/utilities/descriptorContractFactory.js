import { ethers } from 'ethers'

export const ffnDescriptorFactory = async (optionalSigner) => {
  const isRinkeby = window.location.search.indexOf('rinkeby') > -1
  // Connect to the network
  let provider = new ethers.providers.InfuraProvider(
    isRinkeby ? 'rinkeby' : 'homestead', {
    projectId: process.env.REACT_APP_INFURA_PROJECT_ID
  });

  const address = isRinkeby
    ? '0x73E5C1d945372B0af153e0AFE1FF16c99936ae7b'
    : 'TBD'

  const abi = '[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract INounsDescriptor","name":"descriptor","type":"address"}],"name":"NounDescriptorUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint8","name":"_paletteIndex","type":"uint8"},{"internalType":"string","name":"_color","type":"string"}],"name":"addColorToPalette","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"_accessory","type":"bytes"}],"name":"addCustomAccessory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"_background","type":"bytes"}],"name":"addCustomBackground","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"_body","type":"bytes"}],"name":"addCustomBody","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"_glasses","type":"bytes"}],"name":"addCustomGlasses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"_hat","type":"bytes"}],"name":"addCustomHat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"_overlay","type":"bytes"}],"name":"addCustomOverlay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"paletteIndex","type":"uint8"},{"internalType":"string[]","name":"newColors","type":"string[]"}],"name":"addManyColorsToPalette","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"_accessories","type":"bytes[]"}],"name":"addManyCustomAccessories","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"_backgrounds","type":"bytes[]"}],"name":"addManyCustomBackgrounds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"_bodies","type":"bytes[]"}],"name":"addManyCustomBodies","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"_glasses","type":"bytes[]"}],"name":"addManyCustomGlasses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"_hats","type":"bytes[]"}],"name":"addManyCustomHats","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"_overlays","type":"bytes[]"}],"name":"addManyCustomOverlays","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"customAccessories","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"customAccessoryCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"customBackgroundCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"customBackgrounds","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"customBodies","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"customBodyCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"customGlasses","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"customGlassesCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"customHatCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"customHats","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"customOverlayCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"customOverlays","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"components":[{"internalType":"uint48","name":"background","type":"uint48"},{"internalType":"uint48","name":"body","type":"uint48"},{"internalType":"uint48","name":"accessory","type":"uint48"},{"internalType":"uint48","name":"head","type":"uint48"},{"internalType":"uint48","name":"glasses","type":"uint48"}],"internalType":"struct INounsSeeder.Seed","name":"seed","type":"tuple"}],"name":"dataURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fastFoodNouns","outputs":[{"internalType":"contract INounsToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint48","name":"background","type":"uint48"},{"internalType":"uint48","name":"body","type":"uint48"},{"internalType":"uint48","name":"accessory","type":"uint48"},{"internalType":"uint48","name":"head","type":"uint48"},{"internalType":"uint48","name":"glasses","type":"uint48"}],"internalType":"struct INounsSeeder.Seed","name":"seed","type":"tuple"}],"name":"generateSVGImage","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"components":[{"internalType":"uint48","name":"background","type":"uint48"},{"internalType":"uint48","name":"body","type":"uint48"},{"internalType":"uint48","name":"accessory","type":"uint48"},{"internalType":"uint48","name":"head","type":"uint48"},{"internalType":"uint48","name":"glasses","type":"uint48"}],"internalType":"struct INounsSeeder.Seed","name":"seed","type":"tuple"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"genericDataURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getClothesForTokenId","outputs":[{"components":[{"internalType":"uint256","name":"customBackground","type":"uint256"},{"internalType":"uint256","name":"customBody","type":"uint256"},{"internalType":"uint256","name":"customAccessory","type":"uint256"},{"internalType":"uint256","name":"customHat","type":"uint256"},{"internalType":"uint256","name":"customGlasses","type":"uint256"},{"internalType":"uint256","name":"customOverlay","type":"uint256"},{"internalType":"uint256","name":"overrideBody","type":"uint256"},{"internalType":"uint256","name":"overrideAccessory","type":"uint256"},{"internalType":"uint256","name":"overrideGlasses","type":"uint256"}],"internalType":"struct FFNDescriptor.Wearing","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint48","name":"background","type":"uint48"},{"internalType":"uint48","name":"body","type":"uint48"},{"internalType":"uint48","name":"accessory","type":"uint48"},{"internalType":"uint48","name":"head","type":"uint48"},{"internalType":"uint48","name":"glasses","type":"uint48"}],"internalType":"struct INounsSeeder.Seed","name":"_seed","type":"tuple"}],"name":"getTokenIdFromSeed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nounDescriptor","outputs":[{"internalType":"contract INounsDescriptor","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"palettes","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract INounsToken","name":"_address","type":"address"}],"name":"setFastFoodNouns","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract INounsDescriptor","name":"_descriptor","type":"address"}],"name":"setNounDescriptor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"tokenIdsBySeed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"components":[{"internalType":"uint48","name":"background","type":"uint48"},{"internalType":"uint48","name":"body","type":"uint48"},{"internalType":"uint48","name":"accessory","type":"uint48"},{"internalType":"uint48","name":"head","type":"uint48"},{"internalType":"uint48","name":"glasses","type":"uint48"}],"internalType":"struct INounsSeeder.Seed","name":"seed","type":"tuple"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint48","name":"background","type":"uint48"},{"internalType":"uint48","name":"body","type":"uint48"},{"internalType":"uint48","name":"accessory","type":"uint48"},{"internalType":"uint48","name":"head","type":"uint48"},{"internalType":"uint48","name":"glasses","type":"uint48"}],"internalType":"struct INounsSeeder.Seed[]","name":"seedsArray","type":"tuple[]"}],"name":"updateAllTokenIdsBySeed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint48","name":"background","type":"uint48"},{"internalType":"uint48","name":"body","type":"uint48"},{"internalType":"uint48","name":"accessory","type":"uint48"},{"internalType":"uint48","name":"head","type":"uint48"},{"internalType":"uint48","name":"glasses","type":"uint48"}],"internalType":"struct INounsSeeder.Seed","name":"seed","type":"tuple"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"updateTokenIdBySeed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"components":[{"internalType":"uint256","name":"customBackground","type":"uint256"},{"internalType":"uint256","name":"customBody","type":"uint256"},{"internalType":"uint256","name":"customAccessory","type":"uint256"},{"internalType":"uint256","name":"customHat","type":"uint256"},{"internalType":"uint256","name":"customGlasses","type":"uint256"},{"internalType":"uint256","name":"customOverlay","type":"uint256"},{"internalType":"uint256","name":"overrideBody","type":"uint256"},{"internalType":"uint256","name":"overrideAccessory","type":"uint256"},{"internalType":"uint256","name":"overrideGlasses","type":"uint256"}],"internalType":"struct FFNDescriptor.Wearing","name":"_wearing","type":"tuple"}],"name":"wearClothes","outputs":[],"stateMutability":"nonpayable","type":"function"}]'

  // use the infura provider if no signer is passed
  let contract = new ethers.Contract(address, abi, optionalSigner ? optionalSigner : provider)
  return contract
}