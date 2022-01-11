import React, { Component } from 'react'
import styles from './Header.module.css'
import ConnectButton from '../Components/ConectButton'
import Noun from '../Components/Noun'
import { connect } from 'react-redux'
import { tryWearables } from '../redux/actions'
import store from '../redux/store'

class Header extends Component {
  wear = (wearable) => {
    let indexOf = this.props.tryingWearables.allIds.indexOf(wearable.id)
    if (indexOf < 0) {
      store.dispatch(tryWearables({
        byId: {
          ...this.props.tryingWearables.byId,
          [wearable.id]: wearable
        },
        allIds: [...this.props.tryingWearables.allIds, wearable.id]
      }))
    } else {
      let newObj = { ...this.props.tryingWearables }
      delete newObj.byId[wearable.id]
      newObj.allIds.splice(indexOf, 1)
      store.dispatch(tryWearables({
        ...newObj
      }))
    }    
  }
  render () {
    const { settings, wearables, tryingWearables } = this.props
    return (
      <div className={styles.container} style={{ background: settings.backgroundColor || '' }}>
        <div className={styles.wrap}>
          <Noun />
          <div className={styles.header}>Closet</div>
          <div className={styles.grid}>
            {wearables.allIds.map(id => {
              return (
                <div
                  key={id}
                  onClick={() => this.wear(wearables.byId[id])}
                  className={styles.wearable + ' ' + (tryingWearables.allIds.indexOf(id) > -1 && styles.selected)}>
                  <svg
                    dangerouslySetInnerHTML={{
                      __html: wearables.byId[id].rect
                    }}
                    width='320'
                    height='320'
                    viewBox='0 0 320 320'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    shapeRendering='crispEdges'
                  />
                  <div>{wearables.byId[id].name}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    settings: state.settings,
    wearables: state.wearables,
    tryingWearables: state.tryingWearables
  }
}

export default connect(mapStateToProps)(Header)
