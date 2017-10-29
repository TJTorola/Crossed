import { createApp } from "./lib/picodux"
import reducer from "./store/reducer"
import view from "./components"

export default mountID => {
  const mountElement = mountID && document.getElementById(mountID)
  if (mountID && !mountElement) {
    throw new Error(`No element was found for the given mountID: ${mountID}`)
  }

  const initialState = localStorage.getItem("state") || undefined

  createApp(
    {
      reducer,
      view,
      introspectors: [console.log],
      initialState
    },
    mountElement
  )
}
