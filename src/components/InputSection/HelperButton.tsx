import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

import MuiIconButton from '@material-ui/core/IconButton'
import MuiPopover from '@material-ui/core/Popover'
import MuiTypography from '@material-ui/core/Typography'

interface InputSectionHelperButtonProps {
  id: string
  helperText: string
}

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    helperText: { padding: theme.spacing(2) },
  })
)

const InputSectionHelperButton: React.FC<InputSectionHelperButtonProps> = ({
  id: customId,
  helperText,
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? customId : undefined

  return (
    <>
      <MuiIconButton aria-describedby={id} onClick={handleClick}>
        <HelpOutlineIcon />
      </MuiIconButton>
      <MuiPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MuiTypography variant="body1" className={classes.helperText}>
          {helperText}
        </MuiTypography>
      </MuiPopover>
    </>
  )
}

export default InputSectionHelperButton
