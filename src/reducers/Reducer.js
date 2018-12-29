export default Reducer

function Reducer (state, action) {
  const reducer = ({
    IS_OPEN,

  })[action.type]

  return (reducer && reducer(state, action)) || state
}

function IS_OPEN (state, action) {
  return { ...state, isOpen: action.isOpen }
}

