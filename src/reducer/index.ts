import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import listSlice from './list'
import inputSlice from './input'
import resultSlice from './result'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['result'], // only navigation will be persisted
}

const rootReducer = combineReducers({
  list: listSlice.reducer,
  input: inputSlice.reducer,
  result: resultSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export * from './list'
export * from './input'
export * from './result'
export default persistReducer(persistConfig, rootReducer)
