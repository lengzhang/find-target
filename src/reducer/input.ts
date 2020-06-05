import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../config/store'

import { formatNumber } from 'src/utils'

export type InputKeyType = 'item' | 'target' | 'range' | 'numResult'
export interface InputState {
  item: string
  target: string
  range: string
  numResult: string
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
    numResult: '1',
  },
  reducers: {
    change: (state, action) => {
      const { key, value } = action.payload
      state[key] = value
    },
  },
})

export const changeInput = (key: InputKeyType, value: string): AppThunk => (
  dispatch
) => {
  if (key === 'item') {
    value = value
      .split(' ')
      .map((str) => {
        if (!str) return ''
        const match = str.match(/[^()]+/g)
        const formatedNum = formatNumber(match ? match[0] : '', true)

        return `${str[0] === '(' ? '(' : ''}${formatedNum}${
          formatedNum && str[str.length - 1] === ')' ? ')' : ''
        }`
      })
      .join(' ')
  } else {
    value = formatNumber(value, key === 'target' || key === 'range')
  }
  if (!value && (key === 'range' || key === 'numResult')) value = '0'
  else if (value.length > 0 && key === 'numResult') {
    value = value.replace(/^-/, '')
  }
  dispatch(inputSlice.actions.change({ key, value }))
}

export default inputSlice
