import React from 'react'
import { TextFieldProps } from '@material-ui/core/TextField'

export interface InputProps extends Pick<TextFieldProps, 'InputProps'> {
  label?: string
  value: string
  type?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}
