import babel from "rollup-plugin-babel"
import typescript from "rollup-plugin-typescript"
import postcss from "rollup-plugin-postcss"

import babelConfig from "./babel.js"
import postcssConfig from "./postcss.js"
import typesciptConfig from "./typescript.js"

export default {
  input: "src/index.ts",
  output: {
    file: "build/crossed.js",
    format: "umd",
    name: "crossed"
  },
  plugins: [
    typescript(typesciptConfig),
    postcss(postcssConfig),
    babel(babelConfig)
  ]
}
