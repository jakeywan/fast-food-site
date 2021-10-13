import React, { Component } from 'react'
import styles from './Header.module.css'
import ConnectButton from '../Components/ConectButton'

class Header extends Component {
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.wrap}>
          <div className={styles.columns}>
            <div>Noun guy</div>
            <div>Selection controls</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
