import { AppThunk } from '../../config/store'

import { parseFloatNumber, findTarget } from '../../utils'

import resultSlice from './slice'

export const resultPush = (item: number[] | number[][]): AppThunk => (
  dispatch
) => {
  dispatch(resultSlice.actions.push(item))
}

export const resultClean = (): AppThunk => (dispatch, getState) => {
  const {
    result: { list },
  } = getState()
  if (list.length > 0) {
    dispatch(resultSlice.actions.clean())
  }
}

export const calculateResult = (): AppThunk => (dispatch, getState) => {
  dispatch(resultSlice.actions.updateStatus(1))
  const { list, input } = getState()

  const target = parseFloatNumber(input.target)
  const range = parseFloatNumber(input.range)
  const numResult = Math.abs(parseInt(input.numResult))

  if (list.length <= 0 || Number.isNaN(target) || Number.isNaN(range)) {
    dispatch(resultSlice.actions.updateStatus(0))
    return
  }

  const result = []
  const itemList = [...list].sort((a, b) => a - b)

  dispatch(resultSlice.actions.clean())

  if (window && window.Worker) {
    window.resultWorker = new Worker('./worker.js')
    window.resultWorker.onmessage = (e: MessageEvent) => {
      switch (e.data.code) {
        case 0:
          dispatch(resultSlice.actions.updateStatus(1))
          break

        case 1:
          dispatch(resultSlice.actions.push(e.data.list))
          break

        case 2:
          window.resultWorker.terminate()
          window.resultWorker = null
          dispatch(resultSlice.actions.updateStatus(0))
          break

        default:
          dispatch(resultSlice.actions.updateStatus(0))
          break
      }
    }
    window.resultWorker.postMessage({
      list: itemList,
      target,
      range,
      numResult,
    })
  } else {
    findTarget(itemList, target, range, 0, list.length, [], result, numResult)
    dispatch(resultSlice.actions.push(result))
    dispatch(resultSlice.actions.updateStatus(0))
  }
}

export const cancelCalculation = (): AppThunk => (dispatch, getState) => {
  const {
    result: { status },
  } = getState()

  if (status === 1) {
    window.resultWorker.terminate()
    window.resultWorker = null
    dispatch(resultSlice.actions.updateStatus(0))
  }
}
