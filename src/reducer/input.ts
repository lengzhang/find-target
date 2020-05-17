import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../config/store'

export type InputKeyType = 'item' | 'target' | 'range'
export interface InputState {
  item: string
  target: string
  range: string
}
export type InputActions = {
  change: CaseReducer<
    InputState,
    PayloadAction<{
      key: InputKeyType
      value: string
    }>
  >
}

const inputSlice = createSlice<InputState, InputActions>({
  name: 'input',
  initialState: {
    item: '',
    target: '',
    range: '0',
  },
  reducers: {
    change: (state, action) => {
      const { key, value } = action.payload
      state[key] = value
    },
  },
})

export const changeInput = (key: InputKeyType, value: string) => (dispatch) => {
  value =
    key === 'item'
      ? value.replace(/[^\d\.\s]/g, '')
      : key === 'target'
      ? value.replace(/!(\d|\.)/g, '').replace(/(?<=\..*)\./g, '')
      : key === 'range'
      ? value
        ? (value = value.replace(/!(\d)/g, ''))
        : '0'
      : value

  if (value.length > 1) value = value.replace(/^0+/g, '')

  dispatch(inputSlice.actions.change({ key, value }))
}

export default inputSlice
