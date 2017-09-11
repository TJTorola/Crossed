import babel from "rollup-plugin-babel"

export default {
  input: "src/index.js",
  output: {
    file: "build/crossed.js",
    format: "umd",
    name: "crossed"
  },
  plugins: [babel()]
}
