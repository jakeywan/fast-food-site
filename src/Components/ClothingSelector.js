import React, { Component } from 'react'
import { clothes } from '../wearables/clothes'
import styles from './ClothingSelector.module.css'
import { connect } from 'react-redux'
import store from '../redux/store'
import { tryWearables, updateSettings } from '../redux/actions'
import { polyNounsContractFactory } from '../utilities/polyNounsContractFactory'
import { ethers } from 'ethers'

class ClothingSelector extends Component {
  unwear = itemId => {
    let indexOf = this.props.tryingWearables.allIds.indexOf(itemId)
    let newObj = { ...this.props.tryingWearables }
    delete newObj.byId[itemId]
    newObj.allIds.splice(indexOf, 1)
    store.dispatch(tryWearables({
      ...newObj
    }))
    // if the head position is too high now, adjust it downward
    if (this.props.settings.headPosition > this.props.tryingWearables.allIds.length) {
      store.dispatch(updateSettings({
        ...this.props.settings,
        headPosition: this.props.tryingWearables.allIds.length
      }))
    }
  }
  shift = (direction, id) => {
    const currentOrder = [ ...this.props.tryingWearables.allIds ]
    const index = currentOrder.indexOf(id)
    currentOrder.splice(index, 1)
    currentOrder.splice(direction === 'right' ? index + 1 : index - 1, 0, id)
    console.log(currentOrder)
    store.dispatch(tryWearables({
      byId: this.props.tryingWearables.byId,
      allIds: currentOrder
    }))
  }
  shiftHead = (val) => {
    store.dispatch(updateSettings({
      ...this.props.settings,
      headPosition: this.props.settings.headPosition + val
    }))
  }
  getDressedOnChain = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    var signer = provider.getSigner()
    let contract = await polyNounsContractFactory(signer)
    let finalWearables = []
    for (let i = 0; i < this.props.tryingWearables.allIds.length; i++) {
      let wearableRef = {
        contractAddress: '0xA4bd0dC658E6fddE25Be25f1AEcBE8f56e25Ea82',
        tokenId: this.props.tryingWearables.allIds[i]
      }
      finalWearables.push(wearableRef)
    }
    let wear = await contract.wearWearables(
      this.props.settings.selectedNounId,
      this.props.settings.headPosition,
      finalWearables
    )
  }
  render () {
    const {
      tryingWearables,
      unwear,
      settings,
      cancel,
      polyNouns
    } = this.props
    let headExcluded = settings.headPosition >= tryingWearables.allIds.length
    return (
      <div>
        <br />
        <div className={styles.grid}>
          {tryingWearables.allIds.map((id, index) => {
            const item = tryingWearables.byId[id]
              return (
                <div className={styles.listItem} key={id}>
                  {index === settings.headPosition &&
                    <div style={{ marginRight: 16 }}>
                      <svg
                        width='320'
                        height='320'
                        viewBox='0 0 320 320'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        shapeRendering='crispEdges'
                        dangerouslySetInnerHTML={{
                          __html: polyNouns.byId[settings.selectedNounId].headRect
                        }}
                      />
                      <div className={styles.shiftButtons}>
                        {index > 0 && <div onClick={() => this.shiftHead(-1)}>←</div>}
                        <div onClick={() => this.shiftHead(1)}>→</div>
                      </div>
                    </div>
                  }
                  <div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.svg
                      }}
                    />
                    <div className={styles.shiftButtons}>
                      {index > 0 &&
                        <div onClick={() => this.shift('left', id)}>←</div>
                      }
                      <div onClick={() => this.shift('right', id)}>→</div>
                      <div
                        className={styles.removeButton}
                        onClick={() => this.unwear(id)}
                      >
                        X
                      </div>
                    </div>
                  </div>
                </div>
              )
          })}
          {/* NOTE: This is a dupe of above, consolidate */}
          {headExcluded &&
            <div className={styles.listItem}>
              <svg
                width='320'
                height='320'
                viewBox='0 0 320 320'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                shapeRendering='crispEdges'
                dangerouslySetInnerHTML={{
                  __html: polyNouns.byId[settings.selectedNounId].headRect
                }}
              />
              <div className={styles.shiftButtons}>
                <div onClick={() => this.shiftHead(-1)}>←</div>
              </div>
            </div>
          }
        </div>
        <div>
          {settings.connectedAddress &&
            <div
              onClick={this.getDressedOnChain}
              className={`${styles.button} ${styles.saveButton}`}
            >
              Get dressed (on chain)
            </div>
          }
          <div className={styles.cancelButton} onClick={cancel}>
            Cancel
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tryingWearables: state.tryingWearables,
    polyNouns: state.polyNouns
  }
}

export default connect(mapStateToProps)(ClothingSelector)