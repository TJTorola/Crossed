import { objMap } from "./utility"

export const createStore: CreateStore = ({
  reducer,
  middleware = [],
  responders = {},
  introspectors = []
}) => {
  let syncDispatchCount = 0
  let key = 0
  let subscriptionMap = new Map()
  let currentReducer = reducer
  let state = currentReducer(undefined, { type: "@@DUX:INIT" })

  const loadedResponders = objMap(responders, resp => resp(dispatch, getState))

  const subscribe = subscriber => {
    const thisKey = key++
    subscriptionMap.set(thisKey, subscriber)

    return () => subscriptionMap.delete(thisKey)
  }

  const getState = () => state
  const dispatch = action => {
    syncDispatchCount++

    const actions = middleware.reduce((acc, ware) => {
      const last = acc.length > 0 ? acc[acc.length - 1] : action
      return [...acc, last ? ware(state, last) : last]
    }, [])

    const finalAction =
      actions.length > 0 ? actions[actions.length - 1] : action

    const prevState = state
    const nextState = reducer(state, finalAction)

    state = nextState
    const response = loadedResponders[finalAction.type]
      ? loadedResponders[finalAction.type](finalAction)
      : undefined

    introspectors.forEach(i => i({ actions, prevState, nextState, response }))

    if (syncDispatchCount-- === 1) {
      subscriptionMap.forEach(s => s(state))
    }
  }

  const replaceReducer = nextReducer => {
    currentReducer = nextReducer
  }

  return {
    getState,
    dispatch,
    subscribe,
    replaceReducer
  }
}
