import React, { Component,  } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import actions from '@/actions'
import $ from 'jquery'

import '@/styles/register.styl'

class Register extends Component {
constructor(props) {
      super(props)
      this.name = ''
      this.email = ''
      this.password = ''
      this.password2 = ''
      this.state = {
        messageError: ''
      }
    }

  handleChangeName = (e) => {
    const value = e.target.value
    this.name = value
  }

  handleChangeEmail = (e) => {
    $('#email').addClass('email-error')

    const value = e.target.value

    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const isValid = emailRegex.test(value)

    if (isValid) {
      $('#email').removeClass('email-error')
      this.email = value
    } else {
      this.email = false
    }

  }


  handleChangePassword = (e) => {
    const value = e.target.value
    this.password = value
  }

  handleChangePassword2 = (e) => {
    const value = e.target.value
    this.password2 = value
    if (this.password === this.password2) {
      $('#password').removeClass('email-error')
      $('#password2').removeClass('email-error')
    } else {
      $('#password').addClass('email-error')
      $('#password2').addClass('email-error')
    }
  }

  handleRegister = () => {

    if (this.password === this.password2 && this.email) {
      this.setState({messageError: ''})
      this.props.dispatch(actions.register(this.name, this.email, this.password))
      $('.spinner-border').css('display', 'block')
    } else if (!this.email){
      this.setState({messageError: 'Correo incorrecto!'})
    } else {
      this.setState({messageError: 'Las contraseñas no coinciden!'})
    }
  }


  render () {
    return (
      <div className="container-fluid contenedor">
        <div className="row">           
          <p className="col-4 offset-4 title-register">Registra un nuevo usuario.</p> 
        </div>

        <div className="row">            
          <div className="col-4 offset-4 pd-5 container-login">
            <label htmlFor='nombre' className='col-10 offset-1 label-login'>
              Nombre
            </label>
            <input
              id='nombre'
              type='text'
              className='col-10 offset-1 input-login'
              placeholder='nombre'
              onChange={this.handleChangeName}
            />

            <label htmlFor='email' className='col-10 offset-1 label-login'>
              Correo
            </label>
            <input
              id='email'
              type='email'
              className='col-10 offset-1 input-login'
              placeholder='user@email.com'
              onChange={this.handleChangeEmail}
            />
            
            <label htmlFor='password' className='col-10 offset-1 label-login'>
              Contraseña
            </label>
            <input
              id='password'
              className='col-10 offset-1 input-login'
              onChange={this.handleChangePassword}
              type="password"
              placeholder='••••••••••'
            />
            
            <label htmlFor='password2' className='col-10 offset-1 label-login'>
              Confirma Contraseña
            </label>
            <input
              id='password2'
              className='col-10 offset-1 input-login'
              onChange={this.handleChangePassword2}
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
                <button className="btn-login" onClick={this.handleRegister}>Registrar</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    login: state.login,
  }
}

export default connect(mapStateToProps)(Register)
