import babel from "rollup-plugin-babel"
import copy from "rollup-plugin-copy"
import livereload from "rollup-plugin-livereload"
import nodeResolve from "rollup-plugin-node-resolve"
import postcss from "rollup-plugin-postcss"
import serve from "rollup-plugin-serve"
import typescript from "rollup-plugin-typescript"

import babelConfig from "./babel.js"
import livereloadConfig from "./livereload.js"
import postcssConfig from "./postcss.js"
import serveConfig from "./serve.js"
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
    nodeResolve(),
    postcss(postcssConfig),
    babel(babelConfig),
    serve(serveConfig),
    livereload(livereloadConfig)
  ]
}
