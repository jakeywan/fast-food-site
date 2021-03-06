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
import { getRectFromSVG } from '../utilities/getRectFromSVG'
import loadingSkull from '../assets/loading-skull-noun.gif'
import { Link } from 'react-router-dom'

class Noun extends Component {
  state = {
    isTryingClothes: false
  }
  componentDidMount () {
    const { settings, nouns } = this.props
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
        backgroundColor: getSVGBackgroundColor(noun.svg)
      })
    )
  }
  cancel = () => {
    this.setState({
      isTryingClothes: false
    })
  }
  buildSVG = () => {
    const { nouns, tryingWearables, settings } = this.props
    const selectedNoun =
      settings.selectedNounId && nouns.byId[settings.selectedNounId]
    
    let headIncluded = false
    let rects
    for (let i = 0; i < tryingWearables.allIds.length; i++) {
      let id = tryingWearables.allIds[i]
      let wearable = tryingWearables.byId[id]
      if (settings.headPosition === i) {
        rects = rects + selectedNoun.headRect
        headIncluded = true
      }
      rects = rects + getRectFromSVG(wearable.svg)
    }
    if (!headIncluded) {
      rects = rects + selectedNoun.headRect
    }
    return rects
  }
  render () {
    const { nouns, settings, tryingWearables } = this.props
    const selectedNoun =
      settings.selectedNounId && nouns.byId[settings.selectedNounId]
    return (
      <div className={styles.columns}>
        <div className={styles.imageContainer}>
          {!this.state.isTryingClothes && selectedNoun && (
            // keeping this here in case we want to use opensea as fallback
            // <img src={ || nouns.byId[settings.selectedNounId].image_url} />
            <div
              className={styles.originalImage}
              dangerouslySetInnerHTML={{
                __html: selectedNoun.svg
              }}
            />
          )}
          {!selectedNoun &&
            <div className={styles.originalImage}>
              <img src={loadingSkull} style={{ width: '100%' }} />
            </div>
          }
          {this.state.isTryingClothes && (
            <React.Fragment>
              <div className={styles.svgEditingContainer}>
                <svg
                  className={styles.overlay}
                  dangerouslySetInnerHTML={{
                    __html: this.buildSVG()
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
          {selectedNoun &&
            <React.Fragment>
              {!!settings.connectedAddress && (
                <div className={styles.nextButtons} style={nouns.allIds.length === 1 ? { opacity: .1} : {}}>
                  <div onClick={() => this.change('back')}>???</div>
                  <div onClick={() => this.change('next')}>???</div>
                </div>
              )}
              <div className={styles.name}>
                Fast Food Noun #{selectedNoun.id}
              </div>
              <div>
                <a href={selectedNoun.permalink} target='_blank'>
                  View on OpenSea
                </a>
              </div>
              {this.state.isTryingClothes && (
                <ClothingSelector
                  settings={settings}
                  cancel={this.cancel}
                />
              )}
              {!this.state.isTryingClothes && (
                <div onClick={this.tryClothes} className={styles.button}>
                  Try on clothes
                </div>
              )}
            </React.Fragment>
          }
          {!selectedNoun &&
            <React.Fragment>
              <div className={styles.name} style={{ marginTop: 144 }}>
                Looks like you haven't staked any Fast Food Nouns
              </div>
              <div className={styles.button}>
                <Link to='/stake' style={{ color: 'black' }}>
                  View staking page
                </Link>
              </div>
            </React.Fragment>
          }
        </div>
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
