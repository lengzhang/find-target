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
