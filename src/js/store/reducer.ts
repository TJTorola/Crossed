export default (state = 0, action) => {
  switch (action.type) {
    case "INCRAMENT":
      return state + 1

    case "DECRAMENT":
      return Math.max(state - 1, 0)

    default:
      return state
  }
}
