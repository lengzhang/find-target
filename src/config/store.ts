// import { createStore, applyMiddleware } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'

// import rootReducer, { RootState } from '../reducer'

// const configureStore = (preloadedState?: RootState) => {
//   const middlewares = [thunkMiddleware]
//   const middleWareEnhancer = applyMiddleware(...middlewares)

//   const store = createStore(
//     rootReducer,
//     preloadedState,
//     composeWithDevTools(middleWareEnhancer)
//   )

//   return store
// }

// export default configureStore

import {
  configureStore as configureToolkitStore,
  DeepPartial,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit'

import rootReducer, { RootState } from '../reducer'

const configureStore = (preloadedState?: DeepPartial<RootState>) => {
  const store = configureToolkitStore({
    reducer: rootReducer,
    preloadedState,
  })
  return store
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default configureStore
