import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import MuiButton from '@material-ui/core/Button'
import MuiIconButton from '@material-ui/core/IconButton'

import ClearAllIcon from '@material-ui/icons/ClearAll'

import { resultClean, RootState } from '../../reducer'

import Block from '../Block'

import ResultItem from './ResultItem'
import { parseFloatNumber } from '../../utils'

const selector = (state: RootState) => {
  return { result: state.result, target: parseFloatNumber(state.input.target) }
}

const ResultSection: React.FC = () => {
  const { result, target } = useSelector(selector)
  const dispatch = useDispatch()

  const onResultClean = () => {
    dispatch(resultClean())
  }

  const renderCleanButton = () => {
    return (
      <MuiIconButton
        aria-label="clean list"
        onClick={onResultClean}
        disabled={result.length <= 0}
      >
        <ClearAllIcon />
      </MuiIconButton>
    )
  }

  return (
    <Block
      header={`Result (${result.length})`}
      showChildren={result.length > 0}
      action={renderCleanButton()}
    >
      {result.map((list, index) => {
        return (
          <ResultItem key={index} index={index} list={list} target={target} />
        )
      })}
    </Block>
  )
}

export default ResultSection
