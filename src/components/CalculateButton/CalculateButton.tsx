import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import MuiButton from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'

import { RootState, calculateResult, cancelCalculation } from '../../reducer'
import { parseFloatNumber } from '../../utils'

const selector = (state: RootState) => {
  return {
    list: state.list,
    target: parseFloatNumber(state.input.target),
    range: parseFloatNumber(state.input.target),
    calculateStatus: state.result.status,
  }
}

const CalculateButton: React.FC = () => {
  const { list, target, range, calculateStatus } = useSelector(selector)
  const dispatch = useDispatch()

  const isDisabled =
    list.length <= 0 ||
    Number.isNaN(target) ||
    Number.isNaN(range) ||
    calculateStatus !== 0

  const onClick = () => {
    dispatch(calculateResult())
  }

  const onCancel = () => {
    dispatch(cancelCalculation())
  }

  return (
    <>
      <MuiButton
        fullWidth
        variant="outlined"
        disabled={isDisabled}
        onClick={onClick}
      >
        {calculateStatus === 1 ? 'Calculating...' : 'Calculate'}
      </MuiButton>
      {calculateStatus === 1 && (
        <MuiButton onClick={onCancel} variant="outlined">
          Cancel
        </MuiButton>
      )}
    </>
  )
}

export default CalculateButton
