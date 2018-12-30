import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import actions from '@/actions'
import $ from 'jquery'

import '@/styles/login.styl'


class Login extends Component {
  constructor(props) {
      super(props)
      this.email = ''
      this.password = ''
      this.state = {
        messageError: ''
      }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.validName !== this.props.validName) {
      $('.spinner-border').css('display', 'none')
      this.setState({messageError: 'Usuario no encontrado.'})
    }
    if (prevProps.passwordOK !== this.props.passwordOK) {
      $('.spinner-border').css('display', 'none')
      this.setState({messageError: 'Contraseña incorrecta!'})
    }

  }

  handleChangeEmail = (e) => {
    $('#mail').addClass('email-error')

    const value = e.target.value

    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const isValid = emailRegex.test(value)

    if (isValid) {
      $('#mail').removeClass('email-error')
      this.email = value
    } else {
      this.email = false
    }
  }

  handleChangePassword = (e) => {
    const value = e.target.value
    this.password = value
  }

  handleLogin = () => {
    console.log(this.email, this.password)
    $('.spinner-border').css('display', 'block')
    this.props.dispatch(actions.login(this.email, this.password))
  }

  render () {
    return (
      <Fragment>
        {!this.props.login ? (
          <div className="container-fluid contenedor">
            <div className="row">           
              <p className="col-4 offset-4 title-login">Ingresa tu correo y contraseña.</p> 
            </div>

            <div className="row">            
              <div className="col-4 offset-4 pd-5 container-login">
                <label htmlFor='mail' className='col-10 offset-1 label-login'>
                  Correo
                </label>
                <input
                  id='mail'
                  type='email'
                  className='col-10 offset-1 input-login'
                  placeholder='user@email.com'
                  onChange={this.handleChangeEmail}
                />
                <label htmlFor='pass' className='col-10 offset-1 label-login'>
                  Contraseña
                </label>
                <input
                  id='pass'
                  className='col-10 offset-1 input-login'
                  onChange={this.handleChangePassword}
                  type="password"
                  placeholder='••••••••••'
                />
              

                <div className='col-10 offset-1 btn-container'>
                  <div className="row">                
                    <div className="col-7">
                      <small>{this.state.messageError}</small>
                      <div className="spinner-border text-info" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>

                    <div className="col-5">                  
                      <button className="btn-login" onClick={this.handleLogin}>Ingresar</button>
                    </div>
                  </div>
                </div>

              </div>            
            </div>
          </div>
        ) : (
          <Redirect to='/table' />
        )
        }
      </Fragment>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    login: state.login,
    passwordOK: state.passwordOK,
    validName: state.validName
  }
}

export default connect(mapStateToProps)(Login)
