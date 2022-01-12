import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Stake.module.css'
import { ffnContractFactory } from '../utilities/ffnContractFactory'
import { stakingContractFactory } from '../utilities/stakingContractFactory'
import { ethers } from 'ethers'
import web3 from 'web3'
import { testAndPromptNetwork } from '../utilities/testAndPromptNetwork';

class Stake extends Component {
  state = {
    tokenId: ''
  }
  stake = async (tokenId) => {
    // first test network
    const test = await testAndPromptNetwork('Ethereum', this.props.settings.network)
    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    var signer = provider.getSigner()
    let contract = await ffnContractFactory(signer)
    let userAddy = this.props.settings.connectedAddress
    let stakingAddy = '0xDA14c912078eBFC6c6d9a1362065a25B7bd81EbF'
    // overloaded fxn syntax
    let stake = await contract['safeTransferFrom(address,address,uint256)'](userAddy, stakingAddy, tokenId)
  }
  unstake = async () => {
    const test = await testAndPromptNetwork('Ethereum', this.props.settings.network)

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    var signer = provider.getSigner()
    let contract = await stakingContractFactory(signer)
    let fetch = await contract.unstake(this.state.tokenId)
  }
  update = (e) => {
    this.setState({
      tokenId: e.target.value
    })
  }
  render () {
    const { nouns, settings } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.header}>Stake</div>
        <div style={{ maxWidth: 800 }}>
          Depositing a Noun in the staking contract automatically activates a
          cross-chain messaging system that will automatically mint you
          a new Noun on Polygon. It will take up to 20 minutes after staking
          for your Polygon Noun to appear. Unstake any time. 
        </div>
        <div className={styles.wrap}>
          {nouns.allIds.length === 0 &&
            <div className={styles.empty}>
              Looks like you don't have any Fast Food Nouns to stake. Visit the
              collection on <a target='_blank' href='https://opensea.io/collection/fast-food-nouns'>OpenSea</a> to buy one.
            </div>
          }
          {nouns.allIds.length > 0  &&
            nouns.allIds.map((id) => {
              return (
                <div className={styles.noun} key={id}>
                  <img src={nouns.byId[id].image_url} />
                  <div className={styles.button} onClick={() => this.stake(id)}>
                    Stake
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className={styles.header}>Unstake</div>
        <div style={{ maxWidth: 800 }}>
          Reclaiming your Noun from the staking contract will automatically burn
          your Polygon Noun. Your wearable NFTs will not be affected.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 32 }}>
          <input value={this.state.tokenId} onChange={this.update} placeholder='Token id...' />
          <div style={{ marginTop: 0 }} className={styles.button} onClick={this.unstake}>
            Unstake
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    nouns: state.nouns,
    settings: state.settings
  }
}

export default connect(mapStateToProps)(Stake)