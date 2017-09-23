import test from "ava"
import crossed from "../../../build/crossed.js"
import { BORING_REDUCER, ADD, UNADD } from "./fixtures.js"

const { createStore } = crossed.lib.dux

const store = createStore({
  reducer: BORING_REDUCER
})

test("it initializes", t => {
  t.is(store.getState(), 0)
})

test("it reduces", t => {
  store.dispatch(ADD())
  t.is(store.getState(), 1)
})

test("it reduces again", t => {
  store.dispatch(ADD())
  t.is(store.getState(), 2)
})

test("it reduces other things", t => {
  store.dispatch(UNADD())
  t.is(store.getState(), 1)
})
