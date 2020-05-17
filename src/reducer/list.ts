import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../config/store'
import { parseFloatNumber } from '../utils'

export type ListState = number[]
export type ListActions = {
  push: CaseReducer<ListState, PayloadAction<number | number[]>>
  remove: CaseReducer<ListState, PayloadAction<number>>
  clean: CaseReducer<ListState>
}

const listSlice = createSlice<ListState, ListActions>({
  name: 'list',
  initialState: [],
  reducers: {
    push: (state, action) => {
      if (Array.isArray(action.payload)) state.push(...action.payload)
      else state.push(action.payload)
      state.sort((a, b) => a - b)
    },
    remove: (state, action) => {
      state = state.filter((e, i) => i !== action.payload)
      return state
    },
    clean: (state) => {
      while (state.length > 0) state.shift()
    },
  },
})

export const listPush = (item: number): AppThunk => (dispatch) => {
  dispatch(listSlice.actions.push(item))
}

export const listPushString = (str: string): AppThunk => (dispatch) => {
  dispatch(
    listSlice.actions.push(
      str
        .split(' ')
        .map((e) => parseFloatNumber(e))
        .filter((e) => !Number.isNaN(e))
    )
  )
}

export const listRemove = (index: number): AppThunk => (dispatch, getState) => {
  const { list } = getState()
  if (index >= 0 && index < list.length) {
    dispatch(listSlice.actions.remove(index))
  }
}

export const listClean = (): AppThunk => (dispatch, getState) => {
  const { list } = getState()
  if (list.length > 0) {
    dispatch(listSlice.actions.clean())
  }
}

export default listSlice
