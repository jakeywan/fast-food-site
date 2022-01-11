import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Noun.module.css'
import store from '../redux/store'
import { updateSettings, tryWearables } from '../redux/actions'
import { composeSVGForClothingIds } from '../utilities/composeSVGForClothingIds'
import { removeClothesFromSVG } from '../utilities/removeClothesFromSVG'
import { wearClothes } from '../thunks/wearClothes'
import { getSVGBackgroundColor } from '../utilities/getSVGBackgroundColor'
import ClothingSelector from './ClothingSelector'
import { getRectFromSVG } from '../utilities/getRectFromSVG';

class Noun extends Component {
  state = {
    isTryingClothes: false
  }
  componentWillUnmount () {
    store.dispatch(updateSettings({
      ...this.props.settings,
      backgroundColor: ''
    }))
  }
  tryClothes = () => {
    this.setState({
      isTryingClothes: true
    })
  }
  change = direction => {
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
    const noun = this.props.nouns.byId[newId]
    store.dispatch(
      updateSettings({
        ...this.props.settings,
        selectedNounId: newId,
        backgroundColor: getSVGBackgroundColor(noun.token_metadata)
      })
    )
  }
  cancel = () => {
    this.setState({
      isTryingClothes: false
    })
  }
  onClickWearClothes = () => {
    wearClothes(this.props.settings.selectedNounId)
  }
  render () {
    const { nouns, settings, tryingWearables } = this.props

    // If we don't have a selectedNounId but we do have nouns loaded, just
    // grab the first one and auto select it
    if (!settings.selectedNounId && nouns.allIds.length) {
      store.dispatch(
        updateSettings({
          ...settings,
          selectedNounId: nouns.allIds[0]
        })
      )
    }

    const selectedNoun =
      settings.selectedNounId && nouns.byId[settings.selectedNounId]

    const buildSVG = () => {
      let rects = selectedNoun.headRect
      for (let i = 0; i < tryingWearables.allIds.length; i++) {
        let id = tryingWearables.allIds[i]
        let wearable = tryingWearables.byId[id]
        rects = rects + getRectFromSVG(wearable.svg)
      }
      return rects
    }

    return (
      <div className={styles.columns}>
        {selectedNoun && (
          <React.Fragment>
            <div className={styles.imageContainer}>
              {!this.state.isTryingClothes && (
                // keeping this here in case we want to use opensea as fallback
                // <img src={ || nouns.byId[settings.selectedNounId].image_url} />
                <div
                  className={styles.originalImage}
                  dangerouslySetInnerHTML={{
                    __html: selectedNoun.svg
                  }}
                />
              )}
              {this.state.isTryingClothes && (
                <React.Fragment>
                  <div className={styles.svgEditingContainer}>
                    <svg
                      className={styles.overlay}
                      dangerouslySetInnerHTML={{
                        __html: buildSVG()
                      }}
                      width='320'
                      height='320'
                      viewBox='0 0 320 320'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      shapeRendering='crispEdges'
                    />
                  </div>
                </React.Fragment>
              )}
            </div>
            <div className={styles.column}>
              {!!settings.connectedAddress && (
                <div className={styles.nextButtons}>
                  <div onClick={() => this.change('back')}>←</div>
                  <div onClick={() => this.change('next')}>→</div>
                </div>
              )}
              <div className={styles.name}>{selectedNoun.name}</div>
              <div>
                <a href={selectedNoun.permalink} target='_blank'>
                  View on OpenSea
                </a>
              </div>
              
              {this.state.isTryingClothes && (
                <ClothingSelector
                  settings={settings}
                  cancel={this.cancel}
                  onClickWearClothes={this.onClickWearClothes}
                />
              )}
              {!this.state.isTryingClothes && (
                <div onClick={this.tryClothes} className={styles.button}>
                  Try on clothes
                </div>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    nouns: state.polyNouns,
    settings: state.settings,
    tryingWearables: state.tryingWearables
  }
}

export default connect(mapStateToProps)(Noun)
