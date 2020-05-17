import { combineReducers } from '@reduxjs/toolkit'

import listSlice from './list'
import inputSlice from './input'

const rootReducer = combineReducers({
  list: listSlice.reducer,
  input: inputSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export * from './list'
export * from './input'
export default rootReducer
