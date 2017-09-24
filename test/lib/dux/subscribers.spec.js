import test from "ava"
import crossed from "../../../build/crossed.js"
import { spy } from "sinon"
import { ADD, BORING_REDUCER, DISPATCHER } from "./fixtures"

const { createStore } = crossed.lib.dux

test("it calls a subscriber", t => {
  const mySpy = spy()
  const store = createStore({
    reducer: BORING_REDUCER
  })
  store.subscribe(mySpy)

  store.dispatch(ADD())
  t.is(mySpy.calledOnce, true)
})

test("it passes in the newState", t => {
  const mySpy = spy()
  const store = createStore({
    reducer: BORING_REDUCER
  })
  store.subscribe(mySpy)

  store.dispatch(ADD())
  t.is(mySpy.calledWith(1), true)
})

test("it calls multiple times", t => {
  const mySpy = spy()
  const store = createStore({
    reducer: BORING_REDUCER
  })
  store.subscribe(mySpy)

  store.dispatch(ADD())
  store.dispatch(ADD())
  t.is(mySpy.calledTwice, true)
})

test("it respects unsubscribe", t => {
  const mySpy = spy()
  const store = createStore({
    reducer: BORING_REDUCER
  })
  const unsubscribe = store.subscribe(mySpy)

  store.dispatch(ADD())
  t.is(mySpy.calledOnce, true)

  unsubscribe()
  store.dispatch(ADD())
  t.is(mySpy.calledOnce, true)
})

test("it calls only once if responders syncronously dispatch more actions", t => {
  const mySpy = spy()
  const store = createStore({
    reducer: BORING_REDUCER,
    observers: {
      ADD: DISPATCHER({ type: "UNADD" })
    }
  })
  store.subscribe(mySpy)

  store.dispatch(ADD())
  t.is(mySpy.calledOnce, true)
})

test("it calls with the newest state if responders syncronously dispatch more actions", t => {
  const mySpy = spy()
  const store = createStore({
    reducer: BORING_REDUCER,
    observers: {
      ADD: DISPATCHER({ type: "UNADD" })
    }
  })
  const unsubscribe = store.subscribe(mySpy)

  store.dispatch(ADD())
  t.is(mySpy.calledWith(0), true)
})
