import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '@/styles/home.styl'


class Home extends Component {

  render () {
    return (
        <div className="container-fluid contenedor">
          <div className="row">
            <p className="col-8 offset-2 title-home">
              Administrador de tareas
            </p>           
          </div>
          <div className="row">
            <div className="col-2 offset-3 col-btn">
              <Link to='/'>
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


export default Home
