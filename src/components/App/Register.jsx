import React, { Component,  } from 'react'
import Link from 'react-router-dom'
import actions from '@/actions'
import '@/styles/register.styl'

class Register extends Component {
constructor(props) {
      super(props)
      this.email = ''
      this.password = ''
      this.password2 = ''
    }

  handleChangeEmail = (e) => {
    const value = e.target.value
    this.email = value
  }

  handleChangePassword = (e) => {
    const value = e.target.value
    this.password = value
  }

  handleChangePassword2 = (e) => {
    const value = e.target.value
    this.password2 = value
  }

  handleLogin = () => {
      // this.props.dispatch(actions.login(this.email, this.password, 'admin'))

    console.log(this.email, this.password, this.password2)

  }

  render () {
    return (
      <div className="container-fluid contenedor">
        <div className="row">           
          <p className="col-4 offset-4 title-register">Registra un nuevo usuario.</p> 
        </div>

        <div className="row">            
          <div className="col-4 offset-4 pd-5 container-login">
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
              <button className="btn-login" onClick={this.handleLogin}>Registrar</button>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}

export default Register
