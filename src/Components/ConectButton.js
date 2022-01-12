import React, { Component } from 'react'
import Web3 from 'web3'
import { fetchNouns } from '../thunks/fetchNouns'
import { fetchPolyNouns } from '../thunks/fetchPolyNouns'
import { fetchWearables } from '../thunks/fetchWearables'
import { updateSettings } from '../redux/actions'
import store from '../redux/store'
import { ethers } from 'ethers'

class ConnectButton extends Component {
  state = {
    connectedAccount: ''
  }
  componentDidMount () {
    // detect network
    this.detectNetwork()
    // Get the connected account & setup event handler for account change
    if (!window.ethereum) return // prevents error thrown on mobile
    window.ethereum.on('accountsChanged', this.accountChangeHandler)
    window.ethereum.on('chainChanged', this.chainChangeHandler)

    setTimeout(() => {
      let address = window.ethereum.selectedAddress
      if (address) {
        this.setState({ connectedAccount: address })
        // whenever we load new nouns, also auto-select the first one
        store.dispatch(updateSettings({
          ...store.getState().settings,
          connectedAddress: address
        }))
        fetchNouns(address)
        fetchPolyNouns(address)
        fetchWearables(address)
      } else {
        fetchNouns()
      }
    }, 500)
  }
  detectNetwork = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const web3 = new Web3(Web3.givenProvider)
    const network = await web3.eth.getChainId()
    let chain
    if (network === 137) chain = 'Polygon'
    if (network === 1) chain = 'Ethereum'
    store.dispatch(updateSettings({
      ...store.getState().settings,
      network: chain
    }))
  }
  accountChangeHandler = (accounts) => {
    this.setState({ connectedAccount: accounts[0] })
    if (accounts[0]) {
      // fetch my nouns
      fetchNouns(accounts[0])
    }
  }
  chainChangeHandler = (data) => {
    this.detectNetwork()
  }
  connectWallet = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
  }
  render () {
    return (
      <div>
        {!this.state.connectedAccount &&
          <div onClick={this.connectWallet}>
            Connect wallet
          </div>
        }
        {this.state.connectedAccount &&
          <div>
            {'0x...' + this.state.connectedAccount.slice(-4)}
          </div>
        }
      </div>
    )
  }
}

export default ConnectButton
