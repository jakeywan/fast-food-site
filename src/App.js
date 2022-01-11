import Header from './Containers/Header'
import Nav from './Containers/Nav'
import { Provider } from 'react-redux'
import store from './redux/store'
import nounPointer from './assets/noun-pointer.png'
import Explainer from './Containers/Explainer'
import styles from './App.module.css'
import Home from './Containers/Home'
import { Routes, Route } from 'react-router-dom'
import Stake from './Containers/Stake'
import Closet from './Containers/Closet'
import Shop from './Containers/Shop'

function App () {
  return (
    <Provider store={store}>
      <div style={{ cursor: `url(${nounPointer}) 20 0, auto` }}>
        <div className={styles.mobileCover}>
          Sorry, the drive-thru isn't taking mobile orders yet (we just bought
          the place like yesterday). Come back soon.
        </div>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />}  />
          <Route path='/stake' element={<Stake />} />
          <Route path='/closet' element={<Closet />} />
          <Route path='/shop' element={<Shop />} />
        </Routes>
      </div>
    </Provider>
  )
}

export default App
