export default {
  prueba, login, register, exit
}

function prueba () {
  console.log('accion prueba')
  return function (dispatch) {
  
    const url = `http://localhost:3000/`
    const miInit = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    }
    return fetch(url, miInit)
      .then(response => {
        if (response.ok) {
          console.log('Request prueba ok')
          return response.json()
        } else { 
          console.log('Error in request prueba:', response) 
        }})
      .then(data => {
        console.log(data)
      })
      .catch(err => console.error('Error in response prueba:', err))
  }
}

function login (email, password) {
  return function (dispatch) {
    dispatch({ type: 'SET_LOGIN', login: true })

    // const url = 'https://181.143.87.202:3000/admin/login'
    // const body = {admin: {email, password}}
    // const miInit = {
    //   method: 'POST',

    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(body)
    // }
    // console.log(miInit)

    // return fetch(url, miInit)
    //   .then(response => {
    //     if (response.ok) {
    //       console.log('Request login ok')
    //       return response.json()
    //     } else if (response.status === 401) {
    //       dispatch({ type: 'SET_LOGIN', state: {login: false, type} })
    //     }
    //     else { console.log('Error in request login:', response) }
    //   })
    //   .then(data => {
    //     console.log(data)
    //     if (data) {
    //       const login = data.valid
    //       const token = data.token
    //       dispatch({ type: 'SET_LOGIN', state: {login, type} })
    //       dispatch({ type: 'SET_TOKEN', token })
    //     }
    //   })
    //   .catch(err => console.error('Error in response login:', err))
  }
}

function register (name, email, password) {
  return function (dispatch) {
    console.log(name, email, password)
    // const url = 'https://181.143.87.202:3000/admin/login'
    // const body = {admin: {email, password}}
    // const miInit = {
    //   method: 'POST',

    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(body)
    // }
    // console.log(miInit)

    // return fetch(url, miInit)
    //   .then(response => {
    //     if (response.ok) {
    //       console.log('Request login ok')
    //       return response.json()
    //     } else if (response.status === 401) {
    //       dispatch({ type: 'SET_LOGIN', state: {login: false, type} })
    //     }
    //     else { console.log('Error in request login:', response) }
    //   })
    //   .then(data => {
    //     console.log(data)
    //     if (data) {
    //       const login = data.valid
    //       const token = data.token
    //       dispatch({ type: 'SET_LOGIN', state: {login, type} })
    //       dispatch({ type: 'SET_TOKEN', token })
    //     }
    //   })
    //   .catch(err => console.error('Error in response login:', err))
  }
}

function exit (email, password) {
  return function (dispatch) {
    dispatch({ type: 'SET_LOGIN', login: false })
    }
  }