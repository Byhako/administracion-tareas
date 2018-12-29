import React, { Component }  from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Home'
import Login from './Login'
import Register from './Register'
import Table from '../Table/Table'

class AppRouter extends Component {

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/table' component={Table} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default AppRouter
