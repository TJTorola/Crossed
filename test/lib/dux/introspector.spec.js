import test from "ava"
import crossed from "../../../build/crossed.js"
import { spy } from "sinon"
import {
  ADD,
  BORING_REDUCER,
  FOO_WARE,
  BAR_WARE,
  BAZ_WARE,
  RETURNER
} from "./fixtures"

const { createStore } = crossed.lib.dux

const mySymbol = Symbol()
const mySpy = spy()
const myOtherSpy = spy()
createStore({
  reducer: BORING_REDUCER,
  middleware: [FOO_WARE, BAR_WARE, BAZ_WARE],
  observers: {
    ADD: RETURNER(mySymbol)
  },
  introspectors: [mySpy]
}).dispatch(ADD())

test("all introspectors are called", t => {
  t.is(mySpy.called, true)
  t.is(myOtherSpy.called, true)
})

test("it calls with the array of action changes", t => {
  t.deepEqual(mySpy.args[0][0].actions, [
    { type: "ADD" },
    { type: "ADD", foo: "foo" },
    { type: "ADD", foo: "foo", bar: "bar" },
    { type: "ADD", foo: "foo", bar: "bar", baz: "baz" }
  ])
})

test("it passes the previous state", t => {
  t.is(mySpy.args[0][0].prevState, 0)
})

test("it passes the next state", t => {
  t.is(mySpy.args[0][0].nextState, 1)
})

test("it passes the return", t => {
  t.is(mySpy.args[0][0].response, mySymbol)
})
