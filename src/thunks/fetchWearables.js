import axios from 'axios'
import store from '../redux/store'
import { loadPolyNoun, updateSettings, loadWearable } from '../redux/actions'
import { ethers } from 'ethers'
import { getSVGFromEncodedURI } from '../utilities/getSVGFromEncodedURI';
import { getSVGBackgroundColor } from '../utilities/getSVGBackgroundColor';
import { wearablesContractFactory } from '../utilities/wearablesContractFactory';
import { getNameFromEncodedURI } from '../utilities/getNameFromEncodedURI';

export const fetchWearables = async (owner) => {
  console.log(owner)
  let contract = await wearablesContractFactory()

  // loop and check ownership
  for (let i = 0; i < 215; i++) {
    // if we're above token 211, check if token exists first
    let tokenURI
    if (i > 211) {
      try {
        tokenURI = await contract.tokenURI(i)
      } catch (err) {
        break
      }
    }
    // if we made it this far, token exists, check user balance
    let balance = await contract.balanceOf(owner, i)
    let balanceNum = Number(ethers.BigNumber.from(balance).toNumber())
    console.log(balanceNum)

    if (balanceNum === 0) return
    // if we made it this far, this user owns one of these wearables, fetch it
    let wearable = tokenURI || await contract.tokenURI(i)

    if (!wearable) {
      console.log('missing data', i)
    }


    let finalData = {
      id: i,
      rect: getSVGFromEncodedURI(wearable),
      name: getNameFromEncodedURI(wearable)
    }

    store.dispatch(loadWearable(finalData))
    
  }


  return
  // check which tokens this user owns
  let balance = await contract.balanceOf(owner)
  let balanceNum = Number(ethers.BigNumber.from(balance).toNumber())

  for (let i = 0; i < balanceNum; i++) {
    let tokenId = await contract.tokenOfOwnerByIndex(owner, i)
    let tokenIdNum = ethers.BigNumber.from(tokenId).toNumber()
    let token = await contract.tokenURI(tokenIdNum)
    let svg = getSVGFromEncodedURI(token)

    // let's also fetch the svg of just the head
    let seeds = await contract.seeds(tokenIdNum)
    let headSVG = await contract.headSVGs(seeds.head)

    let finalData = {
      id: tokenIdNum,
      svg: svg,
      headRect: headSVG
    }

    store.dispatch(loadPolyNoun(finalData))

    if (i === 0) {
      store.dispatch(updateSettings({
        ...store.getState().settings,
        backgroundColor: getSVGBackgroundColor(svg),
        selectedNounId: tokenIdNum
      }))
    }

  }

}