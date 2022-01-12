import React, { Component } from 'react'
import { clothes } from '../wearables/clothes'
import styles from './ClothingSelector.module.css'
import { connect } from 'react-redux'
import store from '../redux/store'
import { tryWearables, updateSettings } from '../redux/actions'

class ClothingSelector extends Component {
  unwear = itemId => {
    let indexOf = this.props.tryingWearables.allIds.indexOf(itemId)
    let newObj = { ...this.props.tryingWearables }
    delete newObj.byId[itemId]
    newObj.allIds.splice(indexOf, 1)
    store.dispatch(tryWearables({
      ...newObj
    }))
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
  render () {
    const {
      tryingWearables,
      unwear,
      settings,
      cancel,
      onClickWearClothes,
      polyNouns
    } = this.props
    let headExcluded = settings.headPosition >= tryingWearables.allIds.length
    return (
      <div>
        <div className={styles.subHeader}>Drag to change order</div>
        <div className={styles.grid}>
          {tryingWearables.allIds.map((id, index) => {
            const item = tryingWearables.byId[id]
              return (
                <div className={styles.listItem} key={id}>
                  {index === settings.headPosition &&
                    <div style={{ marginRight: 16 }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: polyNouns.byId[settings.selectedNounId].svg
                        }}
                      />
                      <div className={styles.shiftButtons}>
                        <div onClick={() => this.shiftHead(-1)}>←</div>
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
                      <div onClick={() => this.shift('left', id)}>←</div>
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
          {headExcluded &&
            <div className={styles.listItem}>
              <div
                dangerouslySetInnerHTML={{
                  __html: polyNouns.byId[settings.selectedNounId].svg
                }}
              />
              <div className={styles.shiftButtons}>
                <div onClick={() => this.shiftHead(-1)}>←</div>
                <div onClick={() => this.shiftHead(1)}>→</div>
              </div>
            </div>
          }
        </div>
        <div>
          {settings.connectedAddress &&
            <div
              onClick={onClickWearClothes}
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