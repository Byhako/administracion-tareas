export default Reducer

function Reducer (state, action) {
  const reducer = ({
    SET_LOGIN,
    SET_VALIDNAME,
    SET_NAME,
    SET_PASSWORD_OK,
    SET_TASKS
  })[action.type]

  return (reducer && reducer(state, action)) || state
}

function SET_NAME (state, action) {
  return { ...state, name: action.name }
}

function SET_LOGIN (state, action) {
  return { ...state, login: action.login }
}

function SET_VALIDNAME (state, action) {
  return { ...state, validName: action.validName }
}

function SET_PASSWORD_OK (state, action) {
  return { ...state, passwordOK: action.passwordOK }
}

function SET_TASKS (state, action) {
  return { ...state, tasks: action.tasks }
}
