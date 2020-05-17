import React from 'react'

export interface InputProps {
  label?: string
  value: string
  type?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  renderIcon?: () => React.ReactNode
}
