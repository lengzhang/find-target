import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import MuiButton from '@material-ui/core/Button'
import MuiIconButton from '@material-ui/core/IconButton'

import ClearAllIcon from '@material-ui/icons/ClearAll'

import { RootState, listRemove, listClean } from '../../reducer'

import Block from '../Block'

const selector = (state: RootState) => {
  return state.list
}

const ListSection: React.FC = () => {
  const list = useSelector(selector)
  const dispatch = useDispatch()

  const onListRemove = (index: number) => () => {
    dispatch(listRemove(index))
  }

  const onListClean = () => {
    dispatch(listClean())
  }

  const renderCleanButton = () => {
    return (
      <MuiIconButton
        aria-label="clean list"
        onClick={onListClean}
        disabled={list.length <= 0}
      >
        <ClearAllIcon />
      </MuiIconButton>
    )
  }

  return (
    <Block
      header={`List (${list.length})`}
      showChildren={list.length > 0}
      action={renderCleanButton()}
    >
      {list.map((item, index) => {
        return (
          <MuiButton
            key={index}
            variant="outlined"
            onClick={onListRemove(index)}
          >
            {item}
          </MuiButton>
        )
      })}
    </Block>
  )
}

export default ListSection
