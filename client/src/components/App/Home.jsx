import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '@/styles/home.styl'

import actions from '@/actions'

class Home extends Component {

  prueba = () => {
    this.props.dispatch(actions.prueba())
  }

  render () {
    return (
        <div className="container-fluid contenedor">
          <div className="row">
            <p className="col-8 offset-2 title-home">
              Administrador de tareas
            </p>
            <button className="btn1" onClick={this.prueba}>prueba</button>

          </div>
          <div className="row">
            <div className="col-2 offset-3 col-btn">
              <Link to='/register'>
                <button className="btn1">Crear Usuario</button>
              </Link>
            </div>
            <div className="col-2 offset-2 col-btn">
              <Link to='/login'>
                <button className="btn1">Ingresar</button>
              </Link>
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

export default connect(mapStateToProps)(Home)
