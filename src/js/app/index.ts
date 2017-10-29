import { h } from "picodom/src"
import incramentButton from "./incramentButton"
import decramentButton from "./decramentButton"
import { connect } from "../lib/picodux"

const App = ({ incrament, decrament, value }) =>
  h("main", {}, [h("h1", {}, value), decramentButton(), incramentButton()])

const mapStateToProps = state => ({
  value: state
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App)
