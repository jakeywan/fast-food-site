import Header from './Containers/Header'
import Nav from './Containers/Nav'
import { Provider } from 'react-redux'
import store from './redux/store'
import nounPointer from './assets/noun-pointer.png'

function App () {
  return (
    <Provider store={store}>
      <div style={{ cursor: `url(${nounPointer}) 20 0, auto` }}>
        <Nav />
        <Header />
      </div>
    </Provider>
  )
}

export default App
