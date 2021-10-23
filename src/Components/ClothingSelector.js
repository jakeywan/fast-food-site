import React, { Component } from 'react'
import { clothes } from '../wearables/clothes'
import styles from './ClothingSelector.module.css'
import { fetchAllWearables } from '../thunks/fetchAllWearables'
import WearablesList from './WearablesList';

class ClothingSelector extends Component {
  componentDidMount () {
    fetchAllWearables()
  }
  render () {
    const { tryingClothes, unwear, tryOn, settings, cancel, onClickWearClothes } = this.props
    return (
      <div>
        {tryingClothes.length > 0 && (
          <React.Fragment>
            <div className={styles.subHeader}>Trying on</div>
            {tryingClothes.length > 0 &&
              tryingClothes.map(item => {
                return (
                  <div className={styles.listItem}>
                    {clothes[item].title}
                    <div
                      className={styles.removeButton}
                      onClick={() => unwear(item)}
                    >
                      Remove
                    </div>
                  </div>
                )
              })}
          </React.Fragment>
        )}
        <div style={{ marginTop: 24 }}>
          <div className={styles.subHeader}>
            Clothes you can try on
          </div>
          <div>
            {clothes.map((item, index) => {
              if (tryingClothes.indexOf(index) > -1) { return null }
              return (
                <div
                  onClick={() => tryOn(index)}
                  className={styles.listItem}
                >
                  {item.title}
                </div>
              )
            })}
            <WearablesList />
          </div>
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

export default ClothingSelector