import { connect } from "../lib/picodux"
import button from "../components/button"

const mapStateToProps = () => ({
  body: "-"
})

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch({ type: "DECRAMENT" })
})

export default connect(mapStateToProps, mapDispatchToProps)(button)
