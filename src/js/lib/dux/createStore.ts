import makeDispatcher from "./dispatch"
import makeSubscriptionHandler from "./subscriptionHandler"

const createStore: CreateStore = ({
  reducer,
  initialState,
  middleware = [],
  responders = {},
  introspectors = []
}) => {
  let currentReducer = reducer
  let state = reducer(initialState, { type: "@@DUX:INIT" })

  const getState = () => state
  const setState = newState => (state = newState)

  const getReducer = () => currentReducer
  const replaceReducer = newReducer => (currentReducer = newReducer)

  const { subscribe, callSubscribers } = makeSubscriptionHandler(getState)

  const internalAPI: DuxInternalAPI = {
    getState,
    setState,
    getReducer,
    responders,
    introspectors,
    middleware,
    callSubscribers
  }

  const dispatch = makeDispatcher(internalAPI)

  return {
    getState,
    dispatch,
    subscribe,
    replaceReducer
  }
}

export default createStore
