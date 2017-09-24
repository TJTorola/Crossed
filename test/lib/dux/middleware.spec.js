import test from "ava"
import crossed from "../../../build/crossed.js"
import { spy } from "sinon"
import {
  ADD,
  BORING_REDUCER,
  UNADD,
  STOP_WARE,
  NULL_WARE,
  PASS_WARE,
  FOO_WARE,
  BAR_WARE,
  BAZ_WARE,
  ADD_WARE
} from "./fixtures"

const { createStore } = crossed.lib.dux

test("it calls a single middleware", t => {
  const spyWare = spy(PASS_WARE)
  const store = createStore({
    reducer: BORING_REDUCER,
    middleware: [spyWare]
  })

  store.dispatch(ADD())
  t.is(spyWare.calledOnce, true)
})

test("it calls multiple middleware", t => {
  const spyWare = spy(PASS_WARE)
  const store = createStore({
    reducer: BORING_REDUCER,
    middleware: [spyWare, spyWare]
  })

  store.dispatch(ADD())
  t.is(spyWare.calledTwice, true)
})

test("it calls middleware each time you dispatch", t => {
  const spyWare = spy(PASS_WARE)
  const store = createStore({
    reducer: BORING_REDUCER,
    middleware: [spyWare]
  })

  store.dispatch(ADD())
  store.dispatch(UNADD())
  t.is(spyWare.calledTwice, true)
})

test("still calls the reducer with middleware", t => {
  const deceitfulReducer = spy(BORING_REDUCER)
  const store = createStore({
    reducer: deceitfulReducer,
    middleware: [PASS_WARE]
  })

  const addAction = ADD()
  store.dispatch(addAction)
  t.is(deceitfulReducer.calledWith(addAction), true)
})

test("still calls the reducer with multiple middleware", t => {
  const deceitfulReducer = spy(BORING_REDUCER)
  const store = createStore({
    reducer: deceitfulReducer,
    middleware: [PASS_WARE, PASS_WARE]
  })

  const addAction = ADD()
  store.dispatch(addAction)
  t.is(deceitfulReducer.calledWith(addAction), true)
})

test("uses the action middleware returns", t => {
  const store = createStore({
    reducer: BORING_REDUCER,
    middleware: [ADD_WARE]
  })

  store.dispatch(UNADD())
  t.is(store.getState(), 1)
})

test("doesn't pass an action if middleware return undefined", t => {
  const store = createStore({
    reducer: BORING_REDUCER,
    middleware: [STOP_WARE]
  })

  store.dispatch(UNADD())
  t.is(store.getState(), 0)
})

test("doesn't pass an action if middleware return null", t => {
  const store = createStore({
    reducer: BORING_REDUCER,
    middleware: [NULL_WARE]
  })

  store.dispatch(UNADD())
  t.is(store.getState(), 0)
})

test("doesn't call middleware after a previous one returns null", t => {
  const spyWare = spy(PASS_WARE)
  const store = createStore({
    reducer: BORING_REDUCER,
    middleware: [NULL_WARE, spyWare]
  })

  store.dispatch(UNADD())
  t.is(spyWare.called, false)
})

test("doesn't call middleware after a previous one returns undefined", t => {
  const spyWare = spy(PASS_WARE)
  const store = createStore({
    reducer: BORING_REDUCER,
    middleware: [STOP_WARE, spyWare]
  })

  store.dispatch(UNADD())
  t.is(spyWare.called, false)
})

test("calls middleware in order with actions created from the last middleware", t => {
  const fooSpy = spy(FOO_WARE)
  const barSpy = spy(BAR_WARE)
  const bazSpy = spy(BAZ_WARE)
  const store = createStore({
    reducer: BORING_REDUCER,
    middleware: [fooSpy, barSpy, bazSpy]
  })

  store.dispatch(ADD())
  t.is(fooSpy.args[0][1].foo, undefined)
  t.is(fooSpy.args[0][1].bar, undefined)
  t.is(fooSpy.args[0][1].baz, undefined)

  t.is(barSpy.args[0][1].foo, "foo")
  t.is(barSpy.args[0][1].bar, undefined)
  t.is(barSpy.args[0][1].baz, undefined)

  t.is(bazSpy.args[0][1].foo, "foo")
  t.is(bazSpy.args[0][1].bar, "bar")
  t.is(bazSpy.args[0][1].baz, undefined)
})
