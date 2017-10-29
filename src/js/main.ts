import { createApp } from "oaki"
import reducer from "./store/reducer"
import logger from "./store/introspectors/logger"
import view from "./app"

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

  window.clearAndReload = () => {
    localStorage.removeItem("state")
    location.reload()
  }

  createApp(
    {
      reducer,
      view,
      introspectors: [logger, storeState],
      initialState
    },
    mountElement
  )
}
