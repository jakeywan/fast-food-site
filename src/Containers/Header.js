import React, { Component } from 'react'
import styles from './Header.module.css'
import ConnectButton from '../Components/ConectButton'
import Noun from '../Components/Noun';

class Header extends Component {
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.wrap}>
          <div className={styles.columns}>
            <div className={styles.column}>
              <Noun />
            </div>
            <div className={styles.column}>
              Selection controls
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
