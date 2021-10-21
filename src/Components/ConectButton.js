import React, { Component } from 'react'
import Web3 from 'web3'
import { fetchNouns } from '../thunks/fetchNouns';
import { connect } from 'react-redux'
import store from '../redux/store'
import { updateSettings } from '../redux/actions'

class ConnectButton extends Component {
  state = {
    connectedAccount: ''
  }
  componentDidMount () {
    if (!window.ethereum) return // prevents error thrown on mobile
    window.ethereum.on('accountsChanged', this.accountChangeHandler)
    setTimeout(() => {
      let address = window.ethereum.selectedAddress
      if (address) {
        store.dispatch(updateSettings({
          ...this.props.settings,
          connectedAddress: address
        }))
        this.setState({ connectedAccount: address })
        fetchNouns(address)
        // this.getCollections(address)
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

const mapStateToProps = (state, ownProps) => {
  return {
    settings: state.settings
  }
}

export default connect(mapStateToProps)(ConnectButton)
