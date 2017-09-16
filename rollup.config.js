import babel from "rollup-plugin-babel"
import typescript from "rollup-plugin-typescript"

export default {
  input: "src/index.ts",
  output: {
    file: "build/crossed.js",
    format: "umd",
    name: "crossed"
  },
  plugins: [typescript(), babel()]
}
