export const createStore: CreateStore = args => ({
  getState: () => null,
  dispatch: action => null,
  subscribe: listener => () => false,
  replaceReducer: nextReducer => null
})
