import React, { Component } from 'react'
import ConnectButton from '../Components/ConectButton';
import styles from './Nav.module.css'
import { Link } from 'react-router-dom'

class Nav extends Component {
  render () {
    return (
      <div className={styles.container}>
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

export default Nav
