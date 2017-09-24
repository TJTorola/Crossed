import test from "ava"
import crossed from "../../build/crossed.js"

const { regexResults, isObjectLiteral, objMap } = crossed.lib.utility

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

test(`isObjectLiteral() returns false for arrays`, t => {
  t.false(isObjectLiteral([]))
})

test(`isObjectLiteral() returns false for null`, t => {
  t.false(isObjectLiteral(null))
})

test(`isObjectLiteral() returns false for booleans`, t => {
  t.false(isObjectLiteral(false))
})

test(`isObjectLiteral() returns false for regex`, t => {
  t.false(isObjectLiteral(/[a-z]/g))
})

test(`isObjectLiteral() returns false for numbers`, t => {
  t.false(isObjectLiteral(3))
})

test(`isObjectLiteral() returns false for strings`, t => {
  t.false(isObjectLiteral("hello"))
})

test(`isObjectLiteral() returns false for undefined`, t => {
  t.false(isObjectLiteral(undefined))
})

test(`isObjectLiteral() returns true for empty object`, t => {
  t.false(isObjectLiteral({}))
})

test(`isObjectLiteral() returns true for object with content`, t => {
  t.false(isObjectLiteral({ foo: "bar" }))
})

test("objMap() allows you to map an object", t => {
  t.is(objMap({ foo: 1 }, val => val + 1).foo, 2)
})

test("objMap() doesn't mutate the object", t => {
  const obj = { foo: 1 }
  const mappedObj = objMap(obj, val => val + 1)

  t.is(obj.foo, 1)
})

test("objMap() passes the key", t => {
  const obj = { foo: 1 }
  const mappedObj = objMap(obj, (val, key) => key)

  t.is(mappedObj.foo, "foo")
})
