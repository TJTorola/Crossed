type State = any

type Action = {
  type: string
  payload: {
    [key: string]: any
  }
}

type Middleware = (state: State) => Action | Promise<Action>
type Reducer = (state: State, action: Action) => State

type Observer = (
  getState: GetState,
  dispatch: Dispatch
) => (action: Action) => void
type Observers = {
  [actionType: string]: Observer
}

type GetState = () => State
type Dispatch = (action: Action) => void

type SubscriptionKey = string
type Listener = (state: State) => void
type Subscribe = (listener: Listener) => SubscriptionKey
type Unsubscribe = (key: SubscriptionKey) => void

type Store = {
  getState: GetState
  dispatch: Dispatch
  subscribe: Subscribe
  unsubscribe: Unsubscribe
}

type CreateStore = (
  middleware: Array<Middleware>,
  reducer: Reducer,
  observers: Observers
) => Store
