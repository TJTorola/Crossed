import { h } from "oaki"

export default ({ onClick, disabled, body }) =>
  h(
    "button",
    {
      disabled,
      onclick: onClick
    },
    body
  )
