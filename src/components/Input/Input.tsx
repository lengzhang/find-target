import React from 'react'

import MuiTextField from '@material-ui/core/TextField'
import MuiIconButton from '@material-ui/core/IconButton'
import MuiInputAdornment from '@material-ui/core/InputAdornment'

import { InputProps } from './types'

const Input: React.FC<InputProps> = ({
  label,
  value,
  type,
  onChange,
  onKeyPress,
  onClick,
  renderIcon,
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
      InputProps={{
        endAdornment:
          typeof onClick === 'function' ? (
            <MuiInputAdornment position="end">
              <MuiIconButton href="" onClick={onClick}>
                {typeof renderIcon === 'function' && renderIcon()}
              </MuiIconButton>
            </MuiInputAdornment>
          ) : undefined,
      }}
      type={type || 'text'}
    />
  )
}

export default Input
