import React from 'react'

import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'

import { ResultTableHeaderRowProps } from './types'

const ResultTableHeaderRow: React.FC<ResultTableHeaderRowProps> = ({
  headCells,
  order,
  orderBy,
  onSwitchOrder,
  onSetOrderBy,
}) => {
  const onHeaderClick = (id: string) => (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    if (orderBy === id) {
      onSwitchOrder()
    } else {
      onSetOrderBy(id)
    }
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map(({ id, label, colSpan, align }) => {
          const direction = orderBy === id ? order : 'asc'
          return (
            <TableCell
              key={id}
              align={align}
              variant="head"
              sortDirection={direction}
              colSpan={colSpan}
            >
              <TableSortLabel
                active={orderBy === id}
                direction={direction}
                onClick={onHeaderClick(id)}
              >
                {label}
              </TableSortLabel>
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

export default ResultTableHeaderRow
