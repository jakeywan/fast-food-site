import React, { Component } from 'react'
import Web3 from 'web3'
import { fetchNouns } from '../thunks/fetchNouns'
import { fetchPolyNouns } from '../thunks/fetchPolyNouns'
import { fetchWearables } from '../thunks/fetchWearables'
import { updateSettings } from '../redux/actions'
import store from '../redux/store'

class ConnectButton extends Component {
  state = {
    connectedAccount: ''
  }
  componentDidMount () {
    // Get the connected account & setup event handler for account change
    if (!window.ethereum) return // prevents error thrown on mobile
    window.ethereum.on('accountsChanged', this.accountChangeHandler)
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
  accountChangeHandler = (accounts) => {
    this.setState({ connectedAccount: accounts[0] })
    if (accounts[0]) {
      // fetch my nouns
      fetchNouns(accounts[0])
    }
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
