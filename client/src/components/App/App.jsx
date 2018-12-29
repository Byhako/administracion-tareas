import React from 'react'
import { Provider } from 'react-redux'
import AppRoute from './Routers'
import store from '../../config/store'

function App () {
  return (
    <Provider store={store}>
      <AppRoute/>
    </Provider>
  )
}

export default App
