import { h } from "picodom/src"
import { connect } from "../lib/picodux"

const App = ({ incrament, decrament, value }) =>
  h("main", {}, [
    h("h1", {}, value),
    h(
      "button",
      {
        disabled: value <= 0,
        onclick: decrament
      },
      "–"
    ),
    h(
      "button",
      {
        onclick: incrament
      },
      "+"
    )
  ])

const mapStateToProps = state => ({
  value: state
})

const mapDispatchToProps = dispatch => ({
  incrament: () => dispatch({ type: "INCRAMENT" }),
  decrament: () => dispatch({ type: "DECRAMENT" })
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
