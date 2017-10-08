import babel from "rollup-plugin-babel"
import typescript from "rollup-plugin-typescript"
import postcss from "rollup-plugin-postcss"

import postcssConfig from "./postcss.config.js"

export default {
  input: "src/index.ts",
  output: {
    file: "build/crossed.js",
    format: "umd",
    name: "crossed"
  },
  plugins: [typescript(), postcss(postcssConfig), babel()]
}
