import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="outlined"
          disabled={isDisabled}
          onClick={onClick}
        >
          {calculateStatus === 1 ? 'Calculating...' : 'Calculate'}
        </Button>
      </Grid>
      {calculateStatus === 1 && (
        <Grid item xs={12}>
          <Button fullWidth onClick={onCancel} variant="outlined">
            Cancel
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

export default CalculateButton
