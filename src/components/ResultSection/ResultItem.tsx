import React from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import MuiGrid from '@material-ui/core/Grid'
import MuiPaper from '@material-ui/core/Paper'
import MuiTypography from '@material-ui/core/Typography'

import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import blue from '@material-ui/core/colors/blue'

import { parseFloatNumber } from '../../utils'

import { ResultItemProps, ResultItemStyleProps } from './types'

const useStyles = makeStyles<Theme, ResultItemStyleProps>((theme) =>
  createStyles({
    root: {},
    diffColor: ({ color }) => ({
      color:
        color === 'blue' ? blue[500] : color === 'red' ? red[500] : green[500],
    }),
  })
)

const ResultItem: React.FC<ResultItemProps> = ({ index, list, target }) => {
  const sum = list.reduce((acc, cur) => parseFloatNumber(acc + cur), 0)
  const diff = parseFloatNumber(sum - target)
  const color = diff > 0 ? 'blue' : diff < 0 ? 'red' : 'green'
  const classes = useStyles({ color })

  return (
    <MuiPaper variant="outlined" style={{ padding: 8 }}>
      <MuiTypography variant="subtitle1">Result {index}</MuiTypography>
      <MuiGrid container>
        <MuiGrid item xs={6}>
          <MuiTypography variant="subtitle2">Sum: {sum}</MuiTypography>
        </MuiGrid>
        <MuiGrid item xs={6}>
          <MuiTypography className={classes.diffColor} variant="subtitle2">
            Different: {diff}
          </MuiTypography>
        </MuiGrid>
      </MuiGrid>
      <MuiGrid container direction="row" wrap="wrap" spacing={2}>
        {list.map((e, j) => (
          <MuiGrid key={j} item>
            <MuiTypography variant="body1">{e}</MuiTypography>
          </MuiGrid>
        ))}
      </MuiGrid>
    </MuiPaper>
  )
}

export default ResultItem
