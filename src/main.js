import * as libEl from "./lib/el.js"

export const index = {
  app: {},
  components: {},
  config: {},
  lib: {
    el: libEl
  },
  store: {}
}

export const run = () => {
  ReactDOM.render(
    React.createElement("div", null, "hello world"),
    document.getElementById("app")
  )
}
