export default { login, register, updateTask, exit }

function register (name, email, password) {
  return function (dispatch) {

    const url = `http://localhost:3000/register`
    const body = {name, email, password}
    const miInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      mode: 'cors'
    }

    return fetch(url, miInit)
      .then(response => {
        if (response.ok) {
          console.log('Request registrar ok')
          return response.json()
        } else { console.log('Error in request registrar:', response) }
      })
      .then(data => {
        console.log(data)
        if (data.validName) {
          dispatch({ type: 'SET_NAME', name })
          dispatch({ type: 'SET_LOGIN', login: true })
        } else {
          dispatch({ type: 'SET_VALIDNAME', validName: false })
        }
      })
      .catch(err => console.error('Error in response registrar:', err))
  }
}

function login (email, password) {
  return function (dispatch) {

    const url = `http://localhost:3000/login`
    const body = {email, password}
    const miInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      mode: 'cors'
    }
    return fetch(url, miInit)
      .then(response => {
        if (response.ok) {
          console.log('Request login ok')
          return response.json()
        } else { console.log('Error in request login:', response) }
      })
      .then(data => {
        if (data.user && data.password) {
          // Usuario valido
          dispatch({ type: 'SET_TASKS', tasks: data.tasks })
          dispatch({ type: 'SET_NAME', name: data.name })
          dispatch({ type: 'SET_LOGIN', login: true })
        } else if (data.user && !data.password) {
          // Password incorrecto
          dispatch({ type: 'SET_PASSWORD_OK', passwordOK: false })
        } else {
          // Usuario no encontrado
          dispatch({ type: 'SET_VALIDNAME', validName: false })
        }
      })
      .catch(err => console.error('Error in response login:', err))
  }
}

function updateTask (name, tasks) {
  return function (dispatch) {

    const url = `http://localhost:3000/updateTasks`
    const body = { name, tasks }
    const miInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      mode: 'cors'
    }
    return fetch(url, miInit)
      .then(response => {
        if (response.ok) {
          console.log('Request createTask ok')
          return response.json()
        } else { console.log('Error in request createTask:', response) }
      })
      .then(data => {
        console.log(data)
      })
      .catch(err => console.error('Error in response createTask:', err))
  }
}

function exit () {
  return function (dispatch) {
    dispatch({ type: 'SET_LOGIN', login: false })
  }
}
