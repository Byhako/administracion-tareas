import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import actions from '@/actions'

import '@/styles/table.styl'

class Table extends Component {
  constructor(props) {
    super(props)

    this.nameTask = ''
    this.priority = 'Baja'
    this.date = ''

    this.state = {
      tasks: []
    }
  }

  handleChangeNewTask = (e) => {
    const value = e.target.value
    this.nameTask = value
  }

  handleChangeDate = (e) => {
    const value = e.target.value
    this.date = value
  }

  handleChangePriority = (e) => {
    const value = e.target.value
    this.priority = value
  }

  createTask = () => {
    console.log(this.nameTask)
    console.log(this.priority)
    console.log(this.date)
    let tasks = this.state.tasks.slice()

    let newTask = {
      name: this.nameTask,
      priority: this.priority,
      date: this.date
    }

    tasks.push(newTask)

    this.setState({tasks})
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
                      <th>Editar/borrar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.tasks.map((task, i) => (
                      <tr key={i}>
                        <td>{task.name}</td>
                        <td>{task.priority}</td>
                        <td>{task.date}</td>
                        <td className="container-icons">
                          <i className="fas fa-edit icon"></i>
                          <i className="fas fa-trash-alt icon"></i>        
                        </td>
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
        <div className="modal fade" id="modalNewTask" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    <label htmlFor="nameTask">Nombre de la tarea</label>
                    <input type="text" className="form-control" id="nameTask"
                      placeholder="nueva tarea" onChange={this.handleChangeNewTask}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="priorityInput">Prioridad</label>
                    <select className="form-control" id="priorityInput" onChange={this.handleChangePriority}>
                      <option>Baja</option>
                      <option>Media</option>
                      <option>Alta</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="expirationDate">Fecha de vencimiento</label>
                    <input type="date" className="form-control" id="expirationDate"
                      placeholder="dd/mm/yyyy" onChange={this.handleChangeDate} />
                  </div>
                  
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-exit" data-dismiss="modal">Salir</button>
                <button type="button" className="btn btn-modal" data-dismiss="modal"
                  onClick={this.createTask}>Crear tarea</button>
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
