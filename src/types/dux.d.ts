declare type State = any

declare type Action = {
  type: string
  payload: {
    [key: string]: any
  }
}

declare type Middleware = (state: State) => Action | Promise<Action>
declare type Reducer = (state: State, action: Action) => State

declare type Observer = (
  getState: GetState,
  dispatch: Dispatch
) => (action: Action) => void
declare type Observers = {
  [actionType: string]: Observer
}

declare type GetState = () => State
declare type Dispatch = (action: Action) => void

declare type SubscriptionKey = string
declare type Listener = (state: State) => void
declare type Subscribe = (listener: Listener) => SubscriptionKey
declare type Unsubscribe = (key: SubscriptionKey) => void

declare type Store = {
  getState: GetState
  dispatch: Dispatch
  subscribe: Subscribe
  unsubscribe: Unsubscribe
}

declare type CreateStore = (
  middleware: Array<Middleware>,
  reducer: Reducer,
  observers: Observers
) => Store
