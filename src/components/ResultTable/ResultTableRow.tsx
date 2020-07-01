import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import blue from '@material-ui/core/colors/blue'

import { ResultTableRowProps } from './types'

const useStyles = makeStyles<Theme, { diff: number }>((theme) =>
  createStyles({
    diffText: ({ diff }) => {
      return { color: diff < 0 ? red[500] : diff > 0 ? blue[500] : green[500] }
    },
  })
)

const ResultTableRow: React.FC<ResultTableRowProps> = ({
  index,
  items,
  diff,
  headCells,
}) => {
  const classes = useStyles({ diff })

  return (
    <TableRow hover>
      <TableCell align={headCells[0].align} colSpan={headCells[0].colSpan}>
        <span>{index}</span>
      </TableCell>
      <TableCell align={headCells[1].align} colSpan={headCells[1].colSpan}>
        <Grid container direction="row" wrap="wrap" spacing={2}>
          {items.map((e, j) => (
            <Grid key={`${index}-items-${e}-${j}`} item>
              <Typography variant="body1">{e}</Typography>
            </Grid>
          ))}
        </Grid>
      </TableCell>
      <TableCell align={headCells[2].align} colSpan={headCells[2].colSpan}>
        <span className={classes.diffText}>{diff}</span>
      </TableCell>
    </TableRow>
  )
}

export default ResultTableRow
