import { createApp } from "./lib/picodux"
import reducer from "./store/reducer"
import view from "./components"

export default mountID => {
  const mountElement = mountID && document.getElementById(mountID)
  if (mountID && !mountElement) {
    throw new Error(`No element was found for the given mountID: ${mountID}`)
  }

  const initialState =
    localStorage.getItem("state") !== null
      ? JSON.parse(localStorage.getItem("state"))
      : undefined

  const storeState = ({ nextState }) =>
    localStorage.setItem("state", JSON.stringify(nextState))

  createApp(
    {
      reducer,
      view,
      introspectors: [console.log, storeState],
      initialState
    },
    mountElement
  )
}
