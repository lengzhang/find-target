import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'

import ResultToolbar from './ResultToolbar'
import ResultTableHeaderRow from './ResultTableHeaderRow'

import useResultTable from './useResultTable'

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    container: {
      overflowY: 'auto',
      maxHeight: '70vh',

      [theme.breakpoints.up('md')]: {
        maxHeight: 500,
      },
    },
    paper: {
      minHeight: '100vh',
      [theme.breakpoints.up('md')]: {
        minHeight: '98vh',
      },
    },
  })
)

const ResultTable: React.FC = () => {
  const classes = useStyles()

  const {
    isCalculating,
    list,
    headCells,
    order,
    orderBy,
    page,
    rowsPerPage,
    onSwitchOrder,
    onSetOrderBy,
    onResultClean,
    onChangePage,
    onChangeRowsPerPage,
  } = useResultTable()

  return (
    <Paper>
      <ResultToolbar
        disableCleanBtn={list.length === 0}
        onResultClean={onResultClean}
      />
      <TableContainer className={classes.container}>
        <Table size="small" stickyHeader>
          <ResultTableHeaderRow
            headCells={headCells}
            order={order}
            orderBy={orderBy}
            onSwitchOrder={onSwitchOrder}
            onSetOrderBy={onSetOrderBy}
          />
          {!isCalculating && (
            <TableBody>
              {list
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((itemProps, i) => {
                  return (
                    <TableRow key={`${itemProps.index}`} hover>
                      {headCells.map(({ id, align, colSpan }) => {
                        return (
                          <TableCell
                            key={`${itemProps.index}-${id}`}
                            align={align}
                            colSpan={colSpan}
                          >
                            {id === 'items' ? (
                              <Grid
                                container
                                direction="row"
                                wrap="wrap"
                                spacing={2}
                              >
                                {itemProps.items.map((e, j) => (
                                  <Grid
                                    key={`${itemProps.index}-${id}-${e}`}
                                    item
                                  >
                                    <Typography variant="body1">{e}</Typography>
                                  </Grid>
                                ))}
                              </Grid>
                            ) : (
                              <span key={`${i}-${id}`}>{itemProps[id]}</span>
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 50, 100]}
        component="div"
        count={list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Paper>
  )
}

export default ResultTable
