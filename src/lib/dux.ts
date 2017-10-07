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

  let loadedResponders

  const subscribe = subscriber => {
    const thisKey = key++
    subscriptionMap.set(thisKey, subscriber)

    return () => subscriptionMap.delete(thisKey)
  }

  const getState = () => state
  const dispatch = action => {
    syncDispatchCount++

    const actions = middleware.reduce(
      (acc, ware) => {
        const last = acc[acc.length - 1]
        return [...acc, last ? ware(state, last) : last]
      },
      [action]
    )
    const finalAction = actions[actions.length - 1]

    if (!finalAction) {
      syncDispatchCount--
      introspectors.forEach(i =>
        i({ actions, prevState: state, nextState: state, response: undefined })
      )
      return
    }

    const prevState = state
    const nextState = currentReducer(state, finalAction)

    state = nextState
    const response = loadedResponders[finalAction.type]
      ? loadedResponders[finalAction.type](finalAction)
      : undefined

    introspectors.forEach(i => i({ actions, prevState, nextState, response }))

    if (syncDispatchCount-- === 1) {
      subscriptionMap.forEach(s => s(getState()))
    }

    return response
  }

  const replaceReducer = nextReducer => {
    currentReducer = nextReducer
  }

  loadedResponders = objMap(responders, resp => resp(dispatch, getState))

  return {
    getState,
    dispatch,
    subscribe,
    replaceReducer
  }
}
