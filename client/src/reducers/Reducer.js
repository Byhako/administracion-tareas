export default Reducer

function Reducer (state, action) {
  const reducer = ({
    SET_LOGIN,
    SET_VALIDNAME

  })[action.type]

  return (reducer && reducer(state, action)) || state
}

function SET_LOGIN (state, action) {
  return { ...state, login: action.login }
}

function SET_VALIDNAME (state, action) {
  return { ...state, validName: action.validName }
}

