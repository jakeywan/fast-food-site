import React, { Component } from 'react'
import ConnectButton from '../Components/ConectButton';
import styles from './Nav.module.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createBrowserHistory } from "history"

class Nav extends Component {
  render () {
    const { settings } = this.props
    return (
      <div
        className={styles.container}
        style={{ background: settings.backgroundColor || '#e1d7d5' }}>
        <div className={styles.wrap}>
          <div className={styles.column}>
            <Link to='/'><span>FFNs</span></Link>
          </div>
          <div>
            <Link to='/stake'>Stake</Link>
          </div>
          <div>
            <Link to='/closet'>Closet</Link>
          </div>
          <div>
            <Link to='/closet'>Shop</Link>
          </div>
          <div className={styles.column}>
            <ConnectButton />
          </div>
        </div>        
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    settings: state.settings
  }
}

export default connect(mapStateToProps)(Nav)
