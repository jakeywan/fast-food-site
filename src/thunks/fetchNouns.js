import axios from 'axios'
import store from '../redux/store'
import { loadNouns, updateSettings } from '../redux/actions'
import { fetchClothingStatePerNoun } from './fetchClothingStatePerNoun'
import { getSVGBackgroundColor } from '../utilities/getSVGBackgroundColor'
import { fetchSVGsFromNode } from './fetchSVGsFromNode'

export const fetchNouns = (owner) => {
  const isRinkeby = window.location.search.indexOf('rinkeby') > -1
  const address = isRinkeby
    ? '0x419CCFf619E671DD772C0Fc7326a5c0368EA751c'
    : '0xFbA74f771FCEE22f2FFEC7A66EC14207C7075a32'
  return new Promise((resolve, reject) => {
    // NOTE: we can omit the key in development, but need one in production
    const baseUrl = `https://${isRinkeby ? 'rinkeby-' : ''}api.opensea.io/api/v1`
    const options = {
      url: !owner
        ? `${baseUrl}/assets?asset_contract_address=${address}&token_ids=${Math.floor(Math.random() * 20)}`
        : `${baseUrl}/assets?owner=${owner}&asset_contract_address=${address}`,
      method: 'get'
    }
    axios.request(options).then((res) => {
      // `res` is a plain array. Format it into an object with tokenIds as keys
      let finalObj = {}
      if (res.data.assets.length <= 0) return // no tokens, stop
      res.data.assets.forEach(token => {
        finalObj[token.token_id] = token
      })
      store.dispatch(loadNouns(finalObj))
      // TODO: remove
      // also fetch and load clothing states for each of them
      fetchClothingStatePerNoun(Object.keys(finalObj))
      // also fetch SVGs from node so we don't have to wait for metadata on OS
      fetchSVGsFromNode(Object.keys(finalObj))
      resolve(res.data)
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })
}