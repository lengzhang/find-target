import { combineReducers } from '@reduxjs/toolkit'

import listSlice from './list'

const rootReducer = combineReducers({ list: listSlice.reducer })

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
