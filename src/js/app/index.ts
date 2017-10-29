import { h, connect } from "oaki"
import incramentButton from "./incramentButton"
import decramentButton from "./decramentButton"

const App = ({ incrament, decrament, value }) =>
  h("main", {}, [h("h1", {}, value), decramentButton(), incramentButton()])

const mapStateToProps = state => ({
  value: state
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App)
