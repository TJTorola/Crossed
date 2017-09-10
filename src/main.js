import lib from "./lib/index.js"

export const index = {
  lib
}

export const run = () => {
  ReactDOM.render(
    React.createElement("div", null, "hello world"),
    document.getElementById("app")
  )
}
