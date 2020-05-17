import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../config/store'

export type ResultState = number[][]
export type ResultActions = {
  push: CaseReducer<ResultState, PayloadAction<number[] | number[][]>>
  clean: CaseReducer<ResultState>
}

const resultSlice = createSlice<ResultState, ResultActions>({
  name: 'result',
  initialState: [],
  reducers: {
    push: (state, action) => {
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        if (Array.isArray(action.payload[0])) {
          state.push(...(action.payload as number[][]))
        } else {
          state.push(action.payload as number[])
        }
        state.sort((a, b) => a.length - b.length)
      }
    },
    clean: (state) => {
      while (state.length > 0) state.shift()
    },
  },
})

export const resultPush = (item: number[] | number[][]): AppThunk => (
  dispatch
) => {
  dispatch(resultSlice.actions.push(item))
}

export const resultClean = (): AppThunk => (dispatch, getState) => {
  const { result } = getState()
  if (result.length > 0) {
    dispatch(resultSlice.actions.clean())
  }
}

export default resultSlice
