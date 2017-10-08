const REACT_NOT_LOADED = `
React & ReactDOM must be loaded into global state for Crossed to function
`

const NO_MOUNT_ID = `
A mounting ID must be provided to mount Crossed into the webpage
`

const NO_ELEMENT_FOUND = mountID => `
No element was found for the given mountID: ${mountID}
`

export default mountID => {
  if (!React || !ReactDOM) throw new Error(REACT_NOT_LOADED)
  if (!mountID) throw new Error(NO_MOUNT_ID)

  const mountElement = document.getElementById(mountID)

  if (!mountElement) throw new Error(NO_ELEMENT_FOUND(mountID))
  ReactDOM.render(React.createElement("div", null, "hello world"), mountElement)
}
