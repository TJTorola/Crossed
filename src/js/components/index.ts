import { h } from "picodom/src"

export default (state, dispatch) =>
  h("main", {}, [
    h("h1", {}, state),
    h(
      "button",
      {
        disabled: state <= 0,
        onclick: () => dispatch({ type: "DECRAMENT" })
      },
      "–"
    ),
    h(
      "button",
      {
        onclick: () => dispatch({ type: "INCRAMENT" })
      },
      "+"
    )
  ])
