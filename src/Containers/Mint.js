import React, { Component } from 'react'
import styles from './Mint.module.css'
import fastFoodGlasses from '../assets/fastFoodGlasses.svg'
import fastFoodHat from '../assets/fastFoodHat.svg'
import fastFoodUniform from '../assets/fastFoodUniform.svg'
import { connect } from 'react-redux'
import { wearablesContractFactory } from '../utilities/wearablesContractFactory'
import { ethers } from 'ethers'
import web3 from 'web3'

class Mint extends Component {
  state = {
    claimed: {}
  }
  mint = async (id) => {
    // verify on polygon first
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    var signer = provider.getSigner()
    let contract = await wearablesContractFactory(signer)
    let mintOpen = await contract.mintOpenWearable(id)
  }
  claim = async (id) => {
    try {
      // verify on polygon first
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      var signer = provider.getSigner()
      let contract = await wearablesContractFactory(signer)
      let claim = await contract.mintBaseWearables(id)
    } catch (err) {
      console.log(err)
      this.setState({
        claimed: {
          ...this.state.claimed,
          [id]: true
        }
      })
    }
    
  }
  render () {
    const { polyNouns } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.header}>Freebies</div>
        <div>
          No Fast Food Noun should show up to work naked. The basic uniform is
          free to mint, and always will be.
        </div>
        <div className={styles.wrap}>
          <div className={styles.wearable}>
            <img src={fastFoodHat} />
            <div className={styles.button} onClick={() => this.mint(211)}>
              Free Mint
            </div>
          </div>
          <div className={styles.wearable}>
            <img src={fastFoodUniform} />
            <div className={styles.button} onClick={() => this.mint(0)}>
              Free Mint
            </div>
          </div>
          <div className={styles.wearable}>
            <img src={fastFoodGlasses} />
            <div className={styles.button} onClick={() => this.mint(1)}>
              Free Mint
            </div>
          </div>
        </div>
        <div className={styles.header}>Claim Basics</div>
        <div>
          Each Fast Food Noun on Polygon can claim their basics once. Check if
          yours are eligible.
        </div>
        <div className={styles.wrap}>
        {polyNouns.allIds.length > 0  &&
          polyNouns.allIds.map((id) => {
            return (
              <div className={styles.wearable} key={id}>
                <div
                  className={styles.originalImage}
                  dangerouslySetInnerHTML={{
                    __html: polyNouns.byId[id].svg
                  }}
                />
                {!this.state.claimed[id] &&
                  <div className={styles.button} onClick={() => this.claim(id)}>
                    Claim Basics
                  </div>
                }
                {this.state.claimed[id] &&
                  <div className={styles.button} style={{ opacity: .5 }}>
                    Already claimed!
                  </div>
                }
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    polyNouns: state.polyNouns
  }
}

export default connect(mapStateToProps)(Mint)