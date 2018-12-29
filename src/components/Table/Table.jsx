import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import $ from 'jquery'
import actions from '@/actions'

import '@/styles/table.styl'

class Table extends Component {
  constructor(props) {
    super(props)

    this.nameTask = ''
    this.priority = 'Baja'
    this.date = ''
    this.idTask = 0

    this.state = {
      tasks: [
        {nameTask: "comer", priority: "Baja", date: "2018-12-30"},
        {nameTask: "nadar", priority: "Media", date: "2018-12-26"},
        {nameTask: "bailar", priority: "Alta", date: "2018-12-30"}
      ],

      editTask: {}
    }
  }

  handleBtnNewTask = () => {
    document.getElementById("form-create").reset()
    this.nameTask = ''
    this.priority = 'Baja'
    this.date = ''
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

  handleIconEdit = (e) => {
    document.getElementById("form-edit").reset()
    const id = e.target.dataset.id
    let task = this.state.tasks[id]
    this.nameTask = task.nameTask
    this.priority = task.priority
    this.date = task.date
    this.idTask = id

    this.setState({editTask: task})
  }

  createTask = () => {
    let tasks = this.state.tasks.slice()
    
    let newTask = {
      nameTask: this.nameTask,
      priority: this.priority,
      date: this.date,
    }

    if (this.nameTask !== '' && this.date !== '') {
      tasks.push(newTask)
      this.setState({tasks})
      $('#modalNewTask').modal('toggle')
    } else {
      $('.modal-header').addClass('modal-error')
      $('.message-error').css("display", "block")
    }
  }

  editTask = () => {
    let tasks = this.state.tasks.slice()
    
    if (this.nameTask !== '' && this.date !== '') {
      tasks[this.idTask].nameTask = this.nameTask
      tasks[this.idTask].priority = this.priority
      tasks[this.idTask].date = this.date

      this.setState({tasks})
      $('#modaEditTask').modal('toggle')
    } else {
      console.log('error')
      $('.modal-header').addClass('modal-error')
      $('.message-error').css("display", "block")
    }
  }

  btnExit = () => {
    this.props.dispatch(actions.exit())
  }

  render () {
    return (
      <Fragment>
        {this.props.login ? (
          <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <span className="navbar-brand mr-auto">Administrador de tareas</span>
              
              <button className="btn btn-nav mr-5" type="button" data-toggle="modal"
                 data-target="#modalNewTask" onClick={this.handleBtnNewTask}>Nueva tarea</button>
              
              <button className="btn btn-nav" type="button" 
                onClick={this.btnExit}>Salir</button>
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
                        <td>{task.nameTask}</td>
                        <td>{task.priority}</td>
                        <td>{task.date}</td>
                        <td className="container-icons">
                          <i className="fas fa-edit icon" data-id={i} data-toggle="modal"
                            data-target="#modaEditTask" onClick={this.handleIconEdit}></i>
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

        {/* Modal create tarea */}
        <div className="modal fade" id="modalNewTask" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Nueva tarea</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form id='form-create'>
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
                      onChange={this.handleChangeDate} />
                  </div>
                  
                </form>
              </div>
              <div className="modal-footer">
                <h6 className='mx-auto message-error'>¡Faltan campos por llenar!</h6>
                <button type="button" className="btn btn-exit" data-dismiss="modal">Salir</button>
                <button type="button" className="btn btn-modal" 
                  onClick={this.createTask}>Crear tarea</button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal edit tarea */}
        <div className="modal fade" id="modaEditTask" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Editar tarea</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form id='form-edit'>
                  <div className="form-group">
                    <label htmlFor="nameTask">Nombre de la tarea</label>
                    <input type="text" className="form-control" id="nameTask"
                      placeholder={this.state.editTask.nameTask} onChange={this.handleChangeNewTask}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="priorityInput">Prioridad</label>
                    <select className="form-control" id="priorityInput"
                     value={this.state.editTask.priority} onChange={this.handleChangePriority}>
                      <option>Baja</option>
                      <option>Media</option>
                      <option>Alta</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="expirationDate">Fecha de vencimiento</label>
                    <input type="date" className="form-control" id="expirationDate"
                       onChange={this.handleChangeDate} />
                  </div>
                  
                </form>
              </div>
              <div className="modal-footer">
                <h6 className='mx-auto message-error'>¡Faltan campos por llenar!</h6>
                <button type="button" className="btn btn-exit" data-dismiss="modal">Salir</button>
                <button type="button" className="btn btn-modal"
                  onClick={this.editTask}>Guardar cambios</button>
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
