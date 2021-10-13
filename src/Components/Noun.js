import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Noun.module.css'
import store from '../redux/store'
import { updateSettings } from '../redux/actions'
import { clothes } from '../clothes'

class Noun extends Component {
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
            <div>
              <img src={nouns.byId[settings.selectedNounId].image_url} />
              <div className={styles.svgOverlay}>
                <svg dangerouslySetInnerHTML={{ __html: clothes[0].svg }} width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" />
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.nextButtons}>
                <div onClick={() => this.change('back')}>←</div>
                <div onClick={() => this.change('next')}>→</div>
              </div>
              <div className={styles.name}>{selectedNoun.name}</div>
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
              <div className={styles.button}>Try on clothes</div>
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