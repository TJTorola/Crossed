import test from "ava"
import crossed from "../../../build/crossed.js"
import { spy, stub } from "sinon"
import {
  ADD,
  BORING_REDUCER,
  UNADD,
  ADD_WARE,
  SPIER,
  ACTIONER,
  RETURNER,
  DISPATCHER
} from "./fixtures"

const { createStore } = crossed.lib.dux

test("it calls the correct responder", t => {
  const mySpy = spy()
  const store = createStore({
    reducer: BORING_REDUCER,
    responders: {
      ADD: SPIER(spy)
    }
  })

  store.dispatch(ADD())
  t.is(mySpy.called, true)
})

test("it doesnt call the incorrect responder", t => {
  const addSpy = spy()
  const unaddSpy = spy()
  const store = createStore({
    reducer: BORING_REDUCER,
    responders: {
      ADD: SPIER(addSpy),
      UNADD: SPIER(unaddSpy)
    }
  })

  store.dispatch(ADD())
  t.is(addSpy.called, true)
  t.is(unaddSpy.called, false)
})

test("dispatch returns the return of the responder", t => {
  const mySymbol = Symbol()
  const store = createStore({
    reducer: BORING_REDUCER,
    responders: {
      ADD: RETURNER(mySymbol)
    }
  })

  t.is(store.dispatch(ADD()), mySymbol)
})

test("is correctly passed getState and dispatch", t => {
  const mySpy = stub().returns(() => {})
  const store = createStore({
    reducer: BORING_REDUCER,
    responders: {
      ADD: mySpy
    }
  })

  t.is(mySpy.args[0][0], store.dispatch)
  t.is(mySpy.args[0][1], store.getState)
})

test("gets passed correctly modified action", t => {
  const mySpy = spy()
  const store = createStore({
    reducer: BORING_REDUCER,
    middleware: [ADD_WARE],
    responders: {
      ADD: SPIER(spy)
    }
  })

  store.dispatch(UNADD())
  t.is(mySpy.args[0][0].type, "ADD")
})
