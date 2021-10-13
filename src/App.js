import Header from './Containers/Header'
import Nav from './Containers/Nav'
import { Provider } from 'react-redux'
import store from './redux/store'

function App () {
  return (
    <Provider store={store}>
      <div className='App'>
        <Nav />
        <Header />
      </div>
    </Provider>
  )
}

export default App
