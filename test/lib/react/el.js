import test from "ava"
import { spy, stub } from "sinon"
import crossed from "../../../build/crossed.js"

const { el } = crossed.lib.react

test.beforeEach(() => {
  global.React = {
    createElement: spy()
  }
})

test("it calls createElement", t => {
  el("div")
  t.true(React.createElement.called)
})

test("it returns result from createElement", t => {
  const result = Symbol()
  React.createElement = stub().returns(result)
  t.is(el("div"), result)
})

test("it correctly calls for a simple div", t => {
  el("div")
  t.is(React.createElement.args[0][0], "div")
})

test("it correctly calls for a simple span", t => {
  el("span")
  t.is(React.createElement.args[0][0], "span")
})

test("it correctly calls for a classed div", t => {
  el("div.class")
  t.is(React.createElement.args[0][0], "div")
})

test("it correctly adds className prop", t => {
  el("div.class")
  t.deepEqual(React.createElement.args[0][1], { className: "class" })
})

test("it correctly calls for a IDed div", t => {
  el("div#id")
  t.is(React.createElement.args[0][0], "div")
})

test("it correctly adds id prop", t => {
  el("div#id")
  t.deepEqual(React.createElement.args[0][1], { id: "id" })
})

test("it correctly calls for a classed & IDed div", t => {
  el("div.class#id")
  t.is(React.createElement.args[0][0], "div")
})

test("it correctly adds className & id prop", t => {
  el("div.class#id")
  t.deepEqual(React.createElement.args[0][1], {
    className: "class",
    id: "id"
  })
})

test("it correctly calls with properties", t => {
  el("div", { prop: "foo" })
  t.deepEqual(React.createElement.args[0][1], { prop: "foo" })
})

test("it correctly calls with multiple properties", t => {
  el("div", { propStr: "foo", propArr: [1, 3] })
  t.deepEqual(React.createElement.args[0][1], {
    propStr: "foo",
    propArr: [1, 3]
  })
})

test("it correctly calls with properties ids and classes", t => {
  el("div.class#id", { prop: "foo" })
  t.deepEqual(React.createElement.args[0][1], {
    className: "class",
    id: "id",
    prop: "foo"
  })
})

test("it ignores null props", t => {
  el("div", null)
  t.deepEqual(React.createElement.args[0][1], {})
})

test("it correctly adds children", t => {
  el("div", null, [])
  t.deepEqual(React.createElement.args[0][2], [])
})

test("it overloads the second arg", t => {
  el("div", [])
  t.deepEqual(React.createElement.args[0][1], {})
  t.deepEqual(React.createElement.args[0][2], [])
})

test("it allows a string as the children", t => {
  const string = "string"
  el("div", null, string)
  el("div", string)
  t.deepEqual(React.createElement.args[0][2], string)
  t.deepEqual(React.createElement.args[1][2], string)
})
