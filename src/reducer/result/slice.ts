import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit'

/**
 * status: 0 - ideal, 1 - calculating
 */
export type ResultStatus = 0 | 1
export interface ResultState {
  status: ResultStatus
  list: number[][]
}
export type ResultActions = {
  updateStatus: CaseReducer<ResultState, PayloadAction<ResultStatus>>
  push: CaseReducer<ResultState, PayloadAction<number[] | number[][]>>
  clean: CaseReducer<ResultState>
}

const resultSlice = createSlice<ResultState, ResultActions>({
  name: 'result',
  initialState: { status: 0, list: [] },
  reducers: {
    updateStatus: (state, action) => {
      state.status = action.payload
    },
    push: (state, action) => {
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        if (Array.isArray(action.payload[0])) {
          state.list.push(...(action.payload as number[][]))
        } else {
          state.list.push(action.payload as number[])
        }
      }
    },
    clean: (state) => {
      while (state.list.length > 0) state.list.shift()
    },
  },
})

export default resultSlice
