import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'

import IconButton from '@material-ui/core/IconButton'

import ClearAllIcon from '@material-ui/icons/ClearAll'

import { ResultToolbarProps } from './types'

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    root: {
      justifyContent: 'space-between',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    title: {
      flex: '1 1 100%',
    },
  })
)

const ResultToolbar: React.FC<ResultToolbarProps> = ({
  disableCleanBtn,
  onResultClean,
}) => {
  const classes = useStyles()

  const renderCleanBtn = () => {
    return disableCleanBtn ? (
      <IconButton
        aria-label="clean list"
        onClick={onResultClean}
        disabled={disableCleanBtn}
      >
        <ClearAllIcon />
      </IconButton>
    ) : (
      <Tooltip title="Clean Results">
        <IconButton
          aria-label="clean list"
          onClick={onResultClean}
          disabled={disableCleanBtn}
        >
          <ClearAllIcon />
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Result
      </Typography>
      {renderCleanBtn()}
    </Toolbar>
  )
}

export default ResultToolbar
