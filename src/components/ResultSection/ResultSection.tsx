import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import MuiGrid from '@material-ui/core/Grid'
import MuiIconButton from '@material-ui/core/IconButton'

import ClearAllIcon from '@material-ui/icons/ClearAll'

import { resultClean, RootState } from '../../reducer'

import Block from '../Block'

import ResultItem from './ResultItem'
import { parseFloatNumber } from '../../utils'

const selector = (state: RootState) => {
  return {
    list: state.result.list,
    target: parseFloatNumber(state.input.target),
  }
}

const ResultSection: React.FC = () => {
  const { list, target } = useSelector(selector)
  const dispatch = useDispatch()

  const onResultClean = () => {
    dispatch(resultClean())
  }

  const renderCleanButton = () => {
    return (
      <MuiIconButton
        aria-label="clean list"
        onClick={onResultClean}
        disabled={list.length <= 0}
      >
        <ClearAllIcon />
      </MuiIconButton>
    )
  }

  return (
    <Block
      header={`Result (${list.length})`}
      showChildren={list.length > 0}
      action={renderCleanButton()}
    >
      <MuiGrid container spacing={2}>
        {list.map((list, index) => {
          return (
            <MuiGrid item key={index} xs={12}>
              <ResultItem index={index} list={list} target={target} />
            </MuiGrid>
          )
        })}
      </MuiGrid>
    </Block>
  )
}

export default ResultSection
