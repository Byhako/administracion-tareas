import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import swal from '@sweetalert/with-react'
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
      tasks: [],
      tasksDanger: [],
      tasksWarning: [],
      editTask: {}
    }
  }

  componentDidMount () {
    this.orderTasks(this.props.tasks)
  }

  handleBtnNewTask = () => {
    $('.modal-header').removeClass('modal-error')
    $('.message-error').css("display", "none")
    $('#form-create').trigger("reset")
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
    $('.modal-header').removeClass('modal-error')
    $('.message-error').css("display", "none")
    $('#form-edit').trigger("reset")

    const id = e.target.dataset.id
    let task = this.state.tasks[id]

    this.nameTask = task.nameTask
    this.priority = task.priority
    this.date = task.date
    this.idTask = id

    this.setState({editTask: task})
  }

  handleIconDelete = (e) => {
    const id = e.target.dataset.id
    let tasks = this.state.tasks.slice()
    let task = tasks[id]

    swal({
      title: "¿Estas seguro?",
      text: `Vas a borrar la tarea "${task.nameTask}".`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        tasks.splice(id, 1)
      
        this.props.dispatch(actions.updateTask(this.props.name, tasks))
        this.orderTasks(tasks)

        swal("Poof! La tarea ha sido borrada!", {
          icon: "success",
        });
      } else {
        swal("No se borró la tarea.")
      }
    })
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
      this.props.dispatch(actions.updateTask(this.props.name, tasks))
      this.orderTasks(tasks)
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

      this.props.dispatch(actions.updateTask(this.props.name, tasks))
      this.orderTasks(tasks)

      $('#modaEditTask').modal('toggle')
    } else {
      console.log('error')
      $('.modal-header').addClass('modal-error')
      $('.message-error').css("display", "block")
    }
  }

  orderTasks = (tasks) => {
    // Obtengo fecha de hoy al inicio del dia
    const today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)

    // Fecha de mañana
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    let tasksOrdered = []
    let tasksDanger = [] // tareas vencidas
    let tasksWarning = [] // tareas próximas a vencersen

    // Para cada tarea, comparo su fecha de vencimiento con la fecha
    // de hoy y de mañana.  Si es anterior a hoy, la tarea esta vencida (danger)
    // si la fecha es hoy o mañana, esta próxima a vencerse (warning)
    tasks.forEach((task) => {
      let dateTask = task.date.split('-')
      dateTask = new Date(
        Number(dateTask[0]),
        Number(dateTask[1]-1),
        Number(dateTask[2])
      )
      let state = 'good'

      if (dateTask < today) {
        state = 'danger'
        tasksDanger.push(task.nameTask)
      } else if (dateTask <= tomorrow) {
        state = 'warning'
        tasksWarning.push(task.nameTask)
      }

      tasksOrdered.push({...task, state})
    })

    this.setState({
      tasks: tasksOrdered,
      tasksDanger,
      tasksWarning
    })

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
              <span className="navbar-brand">Administrador de tareas</span>
              <p id='name-user'>{this.props.name}</p>
              <div className="container-btn-nav">
                <button className="btn btn-nav mr-5" type="button" data-toggle="modal"
                   data-target="#modalNewTask" onClick={this.handleBtnNewTask}>Nueva tarea</button>
                <button className="btn btn-nav" type="button" 
                  onClick={this.btnExit}>Salir</button>
              </div>
            </nav>
            
            <div className="container-fluid container-table">
              <div className="row">
                {/*Tareas próximas a vencerse*/}
                <div className="col-2">
                  <ul className="list-group">
                    <li className="list-group-item title-list-warning">Próximas a vencerse</li>
                    {this.state.tasksWarning.map((name, i) => (
                      <li key={i} className="list-group-item item-warning">{name}</li>
                    ))}
                  </ul>
                </div>
                {/*Tabla principal*/}
                <div className="col-6 offset-1">
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
                      {this.state.tasks.map((task, i) => {
                        let style = {}
                        if (task.state === 'danger') {
                          style = { color: '#EF2929FF' }
                        } else if (task.state === 'warning') {
                          style = { color: '#EDD400FF' }
                        } else {
                          style = { color: 'transparent' }
                        }
                        return (
                          <tr key={i}>
                            <td>
                              <i className="fas fa-circle circle" style={style}/>
                              {task.nameTask}
                            </td>
                            <td>{task.priority}</td>
                            <td>{task.date}</td>
                            <td className="container-icons">
                              <i className="fas fa-edit icon" data-id={i} data-toggle="modal"
                                data-target="#modaEditTask" onClick={this.handleIconEdit} />
                              <i className="fas fa-trash-alt icon" data-id={i} onClick={this.handleIconDelete}></i>        
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/*Tareas vencidas*/}
                <div className="col-2 offset-1">
                  <ul className="list-group">
                    <li className="list-group-item title-list-danger">Vencidas</li>
                    {this.state.tasksDanger.map((name, i) => (
                      <li key={i} className="list-group-item item-danger">{name}</li>
                    ))}
                  </ul>
                </div>
                
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
    name: state.name,
    tasks: state.tasks
  }
}

export default connect(mapStateToProps)(Table)
