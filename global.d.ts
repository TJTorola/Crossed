import * as ReactAPI from "react"
import * as ReactDOMAPI from "react-dom"

declare global {
  const React: typeof ReactAPI
  const ReactDOM: typeof ReactDOMAPI
}
