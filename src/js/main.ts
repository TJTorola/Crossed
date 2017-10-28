import { app } from "hyperapp"
import props from "./props"

const NO_ELEMENT_FOUND = mountID => `
No element was found for the given mountID: ${mountID}
`

export default mountID => {
  const mountElement = mountID && document.getElementById(mountID)
  if (mountID && !mountElement) throw new Error(NO_ELEMENT_FOUND(mountID))

  app(props, mountElement)
}
