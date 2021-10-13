import axios from 'axios'
// import store from '../redux/store'
// import { updateNouns } from '../redux/actions'

export const fetchNouns = (owner) => {
  const address = '0xFbA74f771FCEE22f2FFEC7A66EC14207C7075a32'
  return new Promise((resolve, reject) => {
    // NOTE: we can omit the key in development, but need one in production
    const options = {
      url: `https://api.opensea.io/api/v1/assets?owner=${owner}&asset_contract_address=${address}`,
      method: 'get'
    }
    axios.request(options).then((res) => {
      // `res` is a plain array. Format it into an object with contract addresses as keys
      // store.dispatch(updateNouns(finalObj))
      resolve(res.data)
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })
}