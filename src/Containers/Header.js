import React, { Component } from 'react'
import styles from './Header.module.css'
import ConnectButton from '../Components/ConectButton'
import Noun from '../Components/Noun'
import { connect } from 'react-redux'

class Header extends Component {
  render () {
    const { settings, wearables } = this.props
    return (
      <div className={styles.container} style={{ background: settings.backgroundColor || '' }}>
        <div className={styles.wrap}>
          <Noun />
          <div className={styles.grid}>
            {wearables.allIds.map(id => {
              return (
                <div key={id} className={styles.wearable}>
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
