import atImport from "postcss-import"
import cssNano from "cssnano"
import cssVariables from "postcss-css-variables"

export default {
  plugins: [atImport(), cssNano({ preset: "default" }), cssVariables()],
  extensions: [".css"]
}
