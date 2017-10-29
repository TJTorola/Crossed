declare type Props = {
  [key: string]: any
}

declare type CreateApp = (
  arguments: {
    middleware?: Middleware[]
    reducer: Reducer
    responders?: Responders
    introspectors?: Introspector[]
  },
  node: any
) => void

declare type Connect = (
  mapStateToProps: (State, Props) => Props,
  mapDispatchToProps: (Dispatch, Props) => Props
) => (component: any) => (ownProps: Props) => any
