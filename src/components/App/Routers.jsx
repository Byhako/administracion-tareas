import React, { Component }  from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Home'
import Login from './Login'


class AppRouter extends Component {

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default AppRouter
