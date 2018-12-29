import React, { Component, Fragment } from 'react'
import actions from '@/actions'
import { connect } from 'react-redux'
import '@/styles/login.styl'


class Home extends Component {
constructor(props) {
    super(props)
    this.refEmail = React.createRef()
    this.refPassword = React.createRef()
    this.email = ''
    this.password = ''
  }

  handleChangeEmail = (e) => {
    const value = e.target.value
    this.email = value
  }

  handleChangePassword = (e) => {
    const value = e.target.value
    this.password = value
  }

  handleLogin = () => {
    const location = this.props.location.pathname.split('/')[1]

    if (location === 'admin') {
      this.props.dispatch(actions.login(this.email, this.password, 'admin'))
    } else {
      this.props.dispatch(actions.login(this.email, this.password, 'user'))
    }

  }

  render () {
    return (
      <Fragment>
        <div className="container-fluid contenedor">
          <div className="row">           
            <p className="col-4 offset-4 label-login">Ingresa tu correo y contraseña.</p> 
          </div>

          <div className="row">            
            <div className="col-4 offset-4 pd-5 containerLogin">
              <input
                type='email'
                className='col-10 offset-1 input'
                placeholder='user@email.com'
                onChange={this.handleChangeEmail}
                ref={this.refEmail}
              />
              <input
                className='col-10 offset-1 input'
                onChange={this.handleChangePassword}
                ref={this.refPassword}
                type="password"
                placeholder='••••••••••'
              />
              <div className='col-10 offset-1 btnContainer'>
                <button className="btnLogin" onClick={this.handleLogin}>LOGIN</button>
              </div>
            </div>
            
          </div>
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    login: state.login,
  }
}

export default connect(mapStateToProps)(Home)
