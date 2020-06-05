import React from 'react'

import MuiTextField from '@material-ui/core/TextField'

import { InputProps } from './types'

const Input: React.FC<InputProps> = ({
  label,
  value,
  type,
  onChange,
  onKeyPress,
  InputProps: customInputProps,
}) => {
  return (
    <MuiTextField
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={customInputProps}
      type={type || 'text'}
    />
  )
}

export default Input
