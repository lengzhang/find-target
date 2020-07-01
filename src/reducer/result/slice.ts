import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit'
import { parseFloatNumber, findTarget } from '../../utils'
import { listClean } from '../list'

/**
 * status: 0 - ideal, 1 - calculating
 */
export type ResultStatus = 0 | 1

export interface ResultListItem {
  values: number[]
  sum: number
  diff: number
}
export interface ResultState {
  status: ResultStatus
  list: ResultListItem[]
  target?: number
}
export type ResultActions = {
  initialize: CaseReducer<ResultState>
  updateStatus: CaseReducer<ResultState, PayloadAction<ResultStatus>>
  setTarget: CaseReducer<ResultState, PayloadAction<number | null>>
  push: CaseReducer<ResultState, PayloadAction<number[]>>
  pushMore: CaseReducer<ResultState, PayloadAction<number[][]>>
}

const initialState: ResultState = {
  status: 0,
  list: [],
  target: null,
}

const resultSlice = createSlice<ResultState, ResultActions>({
  name: 'result',
  initialState: initialState,
  reducers: {
    initialize: () => initialState,
    updateStatus: (state, action) => {
      state.status = action.payload
    },
    setTarget: (state, action) => {
      state.target = action.payload
    },
    push: (state, action) => {
      if (action.payload.length > 0) {
        const sum = action.payload.reduce((acc, cur) => acc + cur, 0)
        state.list.push({
          values: action.payload,
          sum,
          diff: parseFloatNumber(state.target - sum),
        })
      }
    },
    pushMore: (state, action) => {
      if (action.payload.length > 0) {
        const target = state.target
        const list = action.payload.map((values) => {
          const sum = values.reduce((acc, cur) => acc + cur, 0)
          return { values, sum, diff: parseFloatNumber(target - sum) }
        })
        state.list.push(...list)
      }
    },
  },
})

export default resultSlice
