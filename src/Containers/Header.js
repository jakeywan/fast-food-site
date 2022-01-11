import React, { Component } from 'react'
import styles from './Header.module.css'
import ConnectButton from '../Components/ConectButton'
import Noun from '../Components/Noun'
import { connect } from 'react-redux'

class Header extends Component {
  state = {
    trying: {
      byId: {},
      allIds: []
    }
  }
  wear = (wearable) => {
    let indexOf = this.state.trying.allIds.indexOf(wearable.id)
    if (indexOf < 0) {
      this.setState({
        trying: {
          byId: {
            ...this.state.trying.byId,
            [wearable.id]: wearable
          },
          allIds: [...this.state.trying.allIds, wearable.id]
        }
      })
    } else {
      let newObj = { ...this.state.trying }
      delete newObj.byId[wearable.id]
      newObj.allIds.splice(indexOf, 1)
      this.setState({
        trying: newObj
      })
    }
    
  }
  render () {
    const { settings, wearables } = this.props
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
                  className={styles.wearable + ' ' + (this.state.trying.allIds.indexOf(id) > -1 && styles.selected)}>
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
    wearables: state.wearables
  }
}

export default connect(mapStateToProps)(Header)
