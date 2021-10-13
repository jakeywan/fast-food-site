import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Noun.module.css'
import store from '../redux/store'
import { updateSettings } from '../redux/actions'
import { clothes } from '../clothes'
import { composeSVGForClothingIds } from '../utilities/composeSVGForClothingIds'

class Noun extends Component {
  state = {
    isTryingClothes: false,
    tryingClothes: []
  }
  tryClothes = () => {
    // set `isTryingClothes` to true
    // set the clothes they already have on to the `tryingClothes` array
    this.setState({
      isTryingClothes: true,
      tryingClothes: this.props.clothingStatesById[this.props.settings.selectedNounId]
    })
  }
  unwear = (itemId) => {
    const newArray = this.state.tryingClothes
    const indexToRemove = this.state.tryingClothes.indexOf(itemId)
    newArray.splice(itemId, 1)
    this.setState({
      tryingClothes: newArray
    })
  }
  change = (direction) => {
    const allIds = this.props.nouns.allIds
    const currentId = this.props.settings.selectedNounId
    const currentIndex = allIds.indexOf(currentId)
    let newId
    if (direction === 'next') {
      if (allIds[currentIndex + 1]) {
        newId = allIds[currentIndex + 1]
      } else {
        newId = allIds[0]
      }
    } else {
      if (allIds[currentIndex - 1]) {
        newId = allIds[currentIndex - 1]
      } else {
        newId = allIds[allIds.length - 1]
      }
    }
    store.dispatch(updateSettings({
      ...this.props.settings,
      selectedNounId: newId
    }))
  }
  render () {
    const { nouns, settings, clothingStatesById } = this.props
    // If we don't have a selectedNounId but we do have nouns loaded, just
    // grab the first one and auto select it
    if (!settings.selectedNounId && nouns.allIds.length) {
      store.dispatch(updateSettings({
        ...settings,
        selectedNounId: nouns.byId[nouns.allIds[0]]
      }))
    }
    const selectedNoun = settings.selectedNounId
      && nouns.byId[settings.selectedNounId]
    return (
      <div className={styles.columns}>
        {selectedNoun &&
          <React.Fragment>
            <div className={styles.imageContainer}>
              <img src={nouns.byId[settings.selectedNounId].image_url} />
              {this.state.isTryingClothes &&
                <div className={styles.svgOverlay}>
                  <svg dangerouslySetInnerHTML={{ __html: composeSVGForClothingIds(this.state.tryingClothes) }} width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" />
                </div>
              }
            </div>
            <div className={styles.column}>
              <div className={styles.nextButtons}>
                <div onClick={() => this.change('back')}>←</div>
                <div onClick={() => this.change('next')}>→</div>
              </div>
              <div className={styles.name}>{selectedNoun.name}</div>
              {!this.state.isTryingClothes &&
                <div>
                  <div className={styles.subHeader}>Currently wearing:</div>
                  {clothingStatesById[settings.selectedNounId] &&
                    clothingStatesById[settings.selectedNounId].map(item => {
                      return (
                        <div className={styles.listItem}>✏️ &nbsp;&nbsp;{clothes[item].title}</div>
                      )
                    }
                  )}
                </div>
              }
              {this.state.isTryingClothes &&
                <div>
                  <div className={styles.subHeader}>Trying on:</div>
                  {this.state.tryingClothes.length > 0 &&
                    this.state.tryingClothes.map(item => {
                      return (
                        <div className={styles.listItem}>
                          ✏️ &nbsp;&nbsp;{clothes[item].title}
                          <div onClick={() => this.unwear(item)}>Take off</div>
                        </div>
                      )
                    }
                  )}
                </div>
              }
              <div onClick={this.tryClothes} className={styles.button}>
                Try on clothes
              </div>
            </div>
          </React.Fragment>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    nouns: state.nouns,
    clothingStatesById: state.clothingStatesById,
    settings: state.settings
  }
}

export default connect(mapStateToProps)(Noun)