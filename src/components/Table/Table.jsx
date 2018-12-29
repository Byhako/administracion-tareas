import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import actions from '@/actions'

import '@/styles/table.styl'

class Table extends Component {
  state = {
    tasks: []
  }

  btnSalir = () => {
    this.props.dispatch(actions.exit())
  }

  render () {
    return (
      <Fragment>
        {this.props.login ? (
          <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <span className="navbar-brand mr-auto">Administrador de tareas</span>
              
              <button className="btn btn-nav mr-5" type="button"
                data-toggle="modal" data-target="#modalNewTask">Nueva tarea</button>
              
              <button className="btn btn-nav" type="button" 
                onClick={this.btnSalir}>Salir</button>
            </nav>
            
            <div className="container-fluid container-table">
              <div className="col-6 offset-3">
                <table className="table table-striped table-dark">
                  <thead>
                    <tr>
                      <th scope="col">Nombre de tarea</th>
                      <th scope="col">Prioridad</th>
                      <th scope="col">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.tasks.map((task, i) => (
                      <tr key={i}>
                        <td>{task.name}</td>
                        <td>{task.priority}</td>
                        <td>{task.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Fragment>
        ) : (
          <Redirect to='/' />
        )}

        {/* Modal Front */}
        <div className="modal fade" id="modalNewTask" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Nueva tarea</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label for="nameTask">Nombre de la tarea</label>
                    <input type="email" className="form-control" id="nameTask" placeholder="nueva tarea" />
                  </div>

                  <div className="form-group">
                    <label for="priorityInput">Prioridad</label>
                    <select className="form-control" id="priorityInput">
                      <option>Baja</option>
                      <option>Media</option>
                      <option>Alta</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label for="expirationDate">Fecha de vencimiento</label>
                    <input type="date" className="form-control" id="expirationDate" placeholder="dd/mm/yyyy" />
                  </div>
                  
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-exit" data-dismiss="modal">Salir</button>
                <button type="button" className="btn btn-modal">Crear tarea</button>
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

export default connect(mapStateToProps)(Table)
