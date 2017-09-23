const BORING_REDUCER = (state = 0, action) => {
  switch (action.type) {
    case "ADD":
      return state + 1

    case "UNADD":
      return state - 1

    default:
      return state
  }
}

const ADD = () => ({ type: "ADD" })
const UNADD = () => ({ type: "UNADD" })

module.exports = {
  ADD,
  BORING_REDUCER,
  UNADD
}
