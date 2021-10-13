import React, { Component } from 'react'
import styles from './Header.module.css'

class Header extends Component {
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.wrap}>
          <div>Noun guy</div>
          <div>Selection controls</div>
        </div>
      </div>
    )
  }
}

export default Header
