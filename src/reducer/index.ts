import { combineReducers } from '@reduxjs/toolkit'

import listSlice from './list'
import inputSlice from './input'
import resultSlice from './result'

const rootReducer = combineReducers({
  list: listSlice.reducer,
  input: inputSlice.reducer,
  result: resultSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export * from './list'
export * from './input'
export * from './result'
export default rootReducer
