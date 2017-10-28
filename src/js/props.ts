import { h } from "hyperapp"

export default {
  state: {
    count: 0
  },
  view: (state, actions) =>
    h("main", {}, [
      h("h1", {}, state.count),
      h(
        "button",
        {
          onclick: actions.down,
          disabled: state.count <= 0
        },
        "–"
      ),
      h(
        "button",
        {
          onclick: actions.up
        },
        "+"
      )
    ]),
  actions: {
    down: state => ({ count: state.count - 1 }),
    up: state => ({ count: state.count + 1 })
  }
}
