import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'

import { resultClean, RootState } from 'src/reducer'
import { parseFloatNumber } from 'src/utils'

import ResultTableHeaderRow from './ResultTableHeaderRow'

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
      <Tooltip title="Clean Results">
        <IconButton
          aria-label="clean list"
          onClick={onResultClean}
          disabled={disableCleanBtn}
        >
          <ClearAllIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  )
}

export default ResultToolbar
