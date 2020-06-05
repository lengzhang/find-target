import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  RootState,
  InputKeyType,
  changeInput,
  listPushString,
  calculateResult,
} from '../../reducer'

import MuiGrid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

import MuiIconButton from '@material-ui/core/IconButton'
import MuiInputAdornment from '@material-ui/core/InputAdornment'

import Input from '../Input'
import HelpButton from './HelperButton'

const selector = (state: RootState) => {
  return state.input
}

const InputSection: React.FC = () => {
  const { item, target, range, numResult } = useSelector(selector)
  const dispatch = useDispatch()

  const onChange = (key: InputKeyType) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(changeInput(key, event.target.value))
  }

  const onEnterPress = (callback: Function) => (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') callback()
  }

  const renderAddBtn = () => {
    return (
      <MuiInputAdornment position="end">
        <MuiIconButton href="" onClick={onItemAdd}>
          <AddIcon />
        </MuiIconButton>
      </MuiInputAdornment>
    )
  }

  const renderHelperBtn = (props: { id: string; helperText: string }) => {
    return (
      <MuiInputAdornment position="end">
        <HelpButton {...props} />
      </MuiInputAdornment>
    )
  }

  const onItemAdd = () => {
    if (item.length > 0) {
      dispatch(listPushString(item))
      dispatch(changeInput('item', ''))
    }
  }

  return (
    <MuiGrid container spacing={2}>
      <MuiGrid item xs={12}>
        <Input
          label="Item"
          value={item}
          onChange={onChange('item')}
          onKeyPress={onEnterPress(onItemAdd)}
          InputProps={{ endAdornment: renderAddBtn() }}
        />
      </MuiGrid>
      <MuiGrid item xs={12} sm={4}>
        <Input
          label="Target"
          value={target}
          onChange={onChange('target')}
          onKeyPress={onEnterPress(() => dispatch(calculateResult()))}
        />
      </MuiGrid>
      <MuiGrid item xs={12} sm={4}>
        <Input label="Range" value={range} onChange={onChange('range')} />
      </MuiGrid>
      <MuiGrid item xs={12} sm={4}>
        <Input
          label="Number of Results"
          value={numResult}
          onChange={onChange('numResult')}
          InputProps={{
            endAdornment: renderHelperBtn({
              id: 'num-result-helper-btn',
              helperText:
                'If Number of Results is 0, the application will calculate all results.',
            }),
          }}
        />
      </MuiGrid>
    </MuiGrid>
  )
}

export default InputSection
