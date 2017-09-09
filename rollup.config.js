import babel from "rollup-plugin-babel"

export default {
  input: "src/main.js",
  output: {
    file: "build/crossed.js",
    format: "iife"
  },
  plugins: [babel()]
}
