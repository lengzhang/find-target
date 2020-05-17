import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit'

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

export default resultSlice
