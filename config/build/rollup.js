import babel from "rollup-plugin-babel"
<<<<<<< HEAD
=======
import closureCompiler from "rollup-plugin-closure-compiler-js"
import copy from "rollup-plugin-copy"
import nodeResolve from "rollup-plugin-node-resolve"
>>>>>>> bd5e1d6... Add hyperapp and configure build
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
    nodeResolve(),
    postcss(postcssConfig),
    babel(babelConfig)
  ]
}
