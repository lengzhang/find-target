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

import Input from '../Input'

const selector = (state: RootState) => {
  return state.input
}

const InputSection: React.FC = () => {
  const { item, target, range } = useSelector(selector)
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

  const renderAddIcon = () => <AddIcon />

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
          onClick={onItemAdd}
          renderIcon={renderAddIcon}
        />
      </MuiGrid>
      <MuiGrid item xs={12} sm={6}>
        <Input
          label="Target"
          value={target}
          onChange={onChange('target')}
          onKeyPress={onEnterPress(() => dispatch(calculateResult()))}
          type="number"
        />
      </MuiGrid>
      <MuiGrid item xs={12} sm={6}>
        <Input
          label="Range"
          value={range}
          onChange={onChange('range')}
          type="number"
        />
      </MuiGrid>
    </MuiGrid>
  )
}

export default InputSection
