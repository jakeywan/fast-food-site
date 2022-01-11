import React, { Component } from 'react'
import { clothes } from '../wearables/clothes'
import styles from './ClothingSelector.module.css'
import { connect } from 'react-redux'
import store from '../redux/store'
import { tryWearables } from '../redux/actions'

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
  render () {
    const { tryingWearables, unwear, tryOn, settings, cancel, onClickWearClothes } = this.props
    return (
      <div>
        <div className={styles.subHeader}>Trying on</div>
        {tryingWearables.allIds.map(id => {
          const item = tryingWearables.byId[id]
            return (
              <div className={styles.listItem}>

                <div>
                  <svg
                    width='50'
                    height='50'
                    viewBox='0 0 320 320'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    shapeRendering='crispEdges'
                    dangerouslySetInnerHTML={{
                    __html: item.rect
                  }} />
                </div>
                <div
                  className={styles.removeButton}
                  onClick={() => this.unwear(id)}
                >
                  Remove
                </div>
              </div>
            )
          })}
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
    tryingWearables: state.tryingWearables
  }
}

export default connect(mapStateToProps)(ClothingSelector)