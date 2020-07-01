import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

import Grid from '@material-ui/core/Grid'

import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import blue from '@material-ui/core/colors/blue'

import MaterialTable, { Options, Column } from 'material-table'

import { RootState } from 'src/reducer'
import { ResultListItem } from 'src/reducer/result'

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    container: {
      padding: `${theme.spacing(3)}px ${theme.spacing(4)}px`,
    },
    item: {},
  })
)

const selector = (state: RootState) => state.result.list

const ResultTable: React.FC = () => {
  const classes = useStyles()
  const list = useSelector(selector)

  const columns: Column<ResultListItem>[] = [
    { title: 'Index', field: 'tableData.id' },
    { title: 'Sum', field: 'sum' },
    {
      title: 'Different',
      field: 'diff',
      cellStyle: (data, { diff }) => {
        return {
          color: diff < 0 ? red[500] : diff > 0 ? blue[500] : green[500],
        }
      },
    },
  ]

  const options: Options = {
    pageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
    search: false,
  }

  const detailPanel = ({ values }: ResultListItem) => {
    return (
      <Grid className={classes.container} container spacing={2}>
        {values.map((item, i) => {
          return (
            <Grid className={classes.item} key={i} item>
              {item}
            </Grid>
          )
        })}
      </Grid>
    )
  }

  return (
    <MaterialTable
      columns={columns}
      data={list.map((e, i) => ({ ...e, tableData: { id: i } }))}
      title={`Result ${list.length}`}
      detailPanel={detailPanel}
      onRowClick={(event, rowData, togglePanel) => togglePanel()}
      options={options}
    />
  )
}

export default ResultTable
