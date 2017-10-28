import { patch } from "picodom/src"
import dux from "./lib/dux"
import reducer from "./store/reducer"
import view from "./components"

export default () => {
  let store = dux.createStore({
    reducer,
    introspectors: [console.log]
  })
  let node

  const render = state => {
    const oldNode = node
    node = view(state, store.dispatch)
    patch(oldNode, node)
  }

  store.subscribe(render)
  render(store.getState())
}
