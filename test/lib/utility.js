import test from "ava"
import { index } from "../../build/crossed.js"

const { regexResults } = index.lib.utility

test("regexResults() returns single element", t => {
  t.deepEqual(regexResults(/(abc)/g)("ahsabcajsd"), ["abc"])
})

test("regexResults() returns multiple elements", t => {
  t.deepEqual(regexResults(/(abc)/g)("ahsabcajsabcd"), ["abc", "abc"])
})

test("regexResults() returns wildcard results", t => {
  t.deepEqual(regexResults(/([0-9])/g)("ah1sabcajsabcd"), ["1"])
})

test("regexResults() returns multiple wildcard results", t => {
  t.deepEqual(regexResults(/([0-9])/g)("ah1sabca3js2abcd"), ["1", "3", "2"])
})

test("regexResults() returns no results", t => {
  t.deepEqual(regexResults(/([A-Z])/g)("ah1sabca3js2abcd"), [])
})

test("regexResults() can be ran mutiple times on same curried regex", t => {
  const results = regexResults(/([a-z])/g)
  const str = "abc"

  t.deepEqual(results(str), ["a", "b", "c"])
  t.deepEqual(results(str), ["a", "b", "c"])
  t.deepEqual(results("def"), ["d", "e", "f"])
})
