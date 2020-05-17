import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import MuiGrid from '@material-ui/core/Grid'
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
      <MuiGrid container spacing={1}>
        {list.map((item, index) => {
          return (
            <MuiGrid item key={index}>
              <MuiButton variant="outlined" onClick={onListRemove(index)}>
                {item}
              </MuiButton>
            </MuiGrid>
          )
        })}
      </MuiGrid>
    </Block>
  )
}

export default ListSection
