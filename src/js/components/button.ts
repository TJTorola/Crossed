import { h } from "picodom/src"

export default ({ onClick, disabled, body }) =>
  h(
    "button",
    {
      disabled,
      onclick: onClick
    },
    body
  )
