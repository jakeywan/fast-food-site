import React, { Component } from 'react'
import { clothes } from '../wearables/clothes'
import styles from './ClothingSelector.module.css'
import { connect } from 'react-redux'

class ClothingSelector extends Component {
  render () {
    const { tryingWearables, unwear, tryOn, settings, cancel, onClickWearClothes } = this.props
    return (
      <div>
        <div className={styles.subHeader}>Trying on</div>
        {tryingWearables.allIds.map(id => {
          const item = tryingWearables.byId[id]
          console.log(item)
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
                  onClick={() => unwear(item)}
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