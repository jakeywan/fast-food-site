import axios from 'axios'
import store from '../redux/store'
import { loadPolyNoun, updateSettings } from '../redux/actions'
import { polyNounsContractFactory } from '../utilities/polyNounsContractFactory'
import { ethers } from 'ethers'
import { getSVGFromEncodedURI } from '../utilities/getSVGFromEncodedURI';
import { getSVGBackgroundColor } from '../utilities/getSVGBackgroundColor';

export const fetchPolyNouns = async (owner) => {
  let contract = await polyNounsContractFactory()
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