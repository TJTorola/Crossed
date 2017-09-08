import resolve from "rollup-plugin-node-resolve"

export default {
  input: "src/main.js",
  output: {
    file: "build/crossed.js",
    format: "cjs"
  },
  plugins: [resolve()]
}
