import { TableCellProps } from '@material-ui/core/TableCell'

import { RootState, ResultStatus } from 'src/reducer'
/* useResultTable */
export type Order = 'asc' | 'desc'

export interface State {
  headCells: HeadCell[]
  target: number
  order: Order
  orderBy: string
  page: number
  rowsPerPage: number
}

export type Action =
  | {
      type: 'set-target'
      target: number
    }
  | {
      type: 'switch-order'
    }
  | {
      type: 'set-order-by'
      orderBy: string
    }
  | {
      type: 'set-page'
      page: number
    }
  | {
      type: 'set-rows-per-page'
      rowsPerPage: number
    }

export interface Reducer {
  (state: State, action: Action): State
}

export interface SelectorReturn {
  list: {
    index: number
    items: number[]
    sum: number
  }[]
  target: number
  status: ResultStatus
}
export interface Selector {
  (state: RootState): SelectorReturn
}

export interface Item {
  diff: number
  index: number
  items: number[]
  sum: number
}

export interface GenerateItemList {
  ({ list }: Pick<SelectorReturn, 'list'>): Item[]
}

/* ResultTableHeaderRow */

export interface HeadCell extends Pick<TableCellProps, 'align' | 'colSpan'> {
  id: string
  label: string
}

export interface ResultTableHeaderRowProps {
  headCells: HeadCell[]
  order: Order
  orderBy: string
  onSwitchOrder: () => void
  onSetOrderBy: (orderBy: string) => void
}

/* ResultToolbar */
export interface ResultToolbarProps {
  disableCleanBtn?: boolean
  onResultClean: () => void
}

/* ResultTableRow */
export interface ResultTableRowProps extends Item {
  headCells: HeadCell[]
}
