import styles from './Home.module.css'
import burgerDude from '../assets/burger-dude.svg'
import React, { Component } from 'react'

class Home extends Component {
  render () {
    return (
      <div className={styles.flex}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <img src={burgerDude} />
            <div className={styles.wrap}>
              <h1>You want fries with that?</h1>
              <div>
                The Fast Food Nouns are an experiment in on chain, composable NFTs. There
                are 1,000 FFNs. Owners can mint, trade, and purchase exclusive NFT clothes and
                accessories to wear on the blockchain.
                <br /><br />
                To get started, pick up a Fast Food Noun on
                &nbsp;<a href='https://opensea.io/collection/fast-food-nouns'>OpenSea</a>, then
                stake to Polygon to use NFT wearables.
                <br /><br />
                <b>IMPORTANT: This tech is highly experimental, and involves
                4 different contracts, working together across chains. Please
                use at your own risk!!</b>
              </div>
            </div>
          </div>
          
        </div>
        <div className={styles.fill} />
      </div>
    )
  }
}

export default Home