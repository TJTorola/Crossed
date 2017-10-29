export default ({ actions, prevState, nextState, response }) => {
  const title = `Action: ${actions[0].type} dispatched`
  console.group(title)
  console.log("Previous State: ", prevState)
  console.log("Middleware Chain: ", actions)
  console.log("Final Action: ", actions[actions.length - 1])
  console.log("Next State: ", nextState)
  if (response !== undefined) console.log("Response: ", response)
  console.groupEnd()
}
