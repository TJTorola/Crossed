import test from "ava"

const { createStore } = crossed.lib.dux

const BORING_REDUCER => (state = 0, action) => {
  switch(action.type) {
    case 'ADD':
      return state + 1;
    
    case 'UNADD':
      return state - 1;
    
    default:
      return state;
  }
}

const store = createStore({
  reducer: BORING_REDUCER,
})

test('it initializes', t => {
  t.is(store.getState(), 0)
})

test("it reduces", t => {
  store.dispatch({ type: 'ADD' })
  t.is(store.getState(), 1)
})

test('it reduces again', t => {
  store.dispatch({ type: 'ADD'})
  t.is(store.getState(), 2)
})

test('it reduces other things', t => {
  store.dispatch({ type: 'UNADD'})
  t.is(store.getState(), 1)
})