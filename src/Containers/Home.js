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
                are 1,000 FFNs, and owners can make, trade, and purchase exclusive NFT clothes and
                accessories which they can also wear on chain.
                <br /><br />
                You can purchase a Fast Food Noun on
                &nbsp;<a href='https://opensea.io/collection/fast-food-nouns'>OpenSea</a>, then
                stake it to bridge to Polygon to mint free clothes, or buy new ones. 
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