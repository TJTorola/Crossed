declare type State = any
declare type Action = {
  type: string
  payload?: any
}

declare type Introspector = (
  values: {
    actions: Action[]
    prevState: State
    nextState: State
    response: any
  }
) => void

declare type Middleware = (state: State, action: Action) => Action | void
declare type Reducer = (state: State, action: Action) => State

declare type LoadedResponder = (action: Action) => any
declare type Responder = (
  dispatch: Dispatch,
  getState: GetState
) => LoadedResponder
declare type LoadedResponders = {
  [actionType: string]: LoadedResponder
}

declare type GetState = () => State
declare type Dispatch = (action: Action) => any

declare type Listener = (state: State) => void
declare type Unsubscribe = () => boolean
declare type Subscribe = (listener: Listener) => Unsubscribe

declare type ReplaceReducer = (nextReducer: Reducer) => void

declare type Store = {
  getState: GetState
  dispatch: Dispatch
  subscribe: Subscribe
  replaceReducer: ReplaceReducer
}

declare type CreateStore = (
  arguments: {
    middleware?: Middleware[]
    reducer: Reducer
    responders?: {
      [actionType: string]: Responder
    }
    introspectors?: Introspector[]
  }
) => Store
