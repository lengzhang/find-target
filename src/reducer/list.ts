import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../config/store'

export type ListState = number[]
export type ListActions = {
  push: CaseReducer<ListState, PayloadAction<number>>
}

const listSlice = createSlice<ListState, ListActions>({
  name: 'list',
  initialState: [],
  reducers: {
    push: (state, action) => {
      state.push(action.payload)
    },
  },
})

export const listPush = (item: number): AppThunk => (dispatch, getState) => {
  dispatch(listSlice.actions.push(item))
}

export default listSlice
