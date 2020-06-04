import { AppThunk } from '../../config/store'

import { parseFloatNumber, findTarget } from '../../utils'

import resultSlice from './slice'

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

export const calculateResult = (): AppThunk => (dispatch, getState) => {
  const { list, input } = getState()
  const target = parseFloatNumber(input.target)
  const range = parseFloatNumber(input.range)
  if (list.length <= 0 || Number.isNaN(target) || Number.isNaN(range)) return
  const result = []
  const itemList = [...list].sort((a, b) => a - b)
  findTarget(itemList, target, range, 0, list.length, [], result)
  dispatch(resultSlice.actions.push(result))
}
