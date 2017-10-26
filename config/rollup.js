import babel from "rollup-plugin-babel"
import closureCompiler from "rollup-plugin-closure-compiler-js"
import copy from "rollup-plugin-copy"
import typescript from "rollup-plugin-typescript"
import postcss from "rollup-plugin-postcss"

import babelConfig from "./babel.js"
import postcssConfig from "./postcss.js"
import staticConfig from "./static.js"
import typesciptConfig from "./typescript.js"

export default {
  input: "src/js/index.ts",
  output: {
    file: "dist/crossed.js",
    format: "umd",
    name: "crossed"
  },
  plugins: [
    copy(staticConfig),
    typescript(typesciptConfig),
    postcss(postcssConfig),
    babel(babelConfig),
    closureCompiler()
  ]
}
