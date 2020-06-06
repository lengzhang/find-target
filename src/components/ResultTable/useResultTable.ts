import { useCallback, useEffect, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { resultClean } from 'src/reducer'
import { parseFloatNumber } from 'src/utils'

import { Selector, State, Reducer, GenerateItemList, HeadCell } from './types'

const headCells: HeadCell[] = [
  { id: 'index', label: 'Index', colSpan: 1, align: 'left' },
  { id: 'items', label: 'Items', colSpan: 4, align: 'left' },
  { id: 'diff', label: 'Different', colSpan: 1, align: 'right' },
]

const initialState: State = {
  headCells: headCells,
  target: 0,
  order: 'asc',
  orderBy: '',
  page: 0,
  rowsPerPage: 10,
}

const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case 'set-target':
      return { ...state, target: action.target }

    case 'switch-order':
      return { ...state, order: state.order === 'asc' ? 'desc' : 'asc' }

    case 'set-order-by':
      return { ...state, orderBy: action.orderBy }

    case 'set-page':
      return { ...state, page: action.page }

    case 'set-rows-per-page':
      return { ...state, rowsPerPage: action.rowsPerPage }

    default:
      return state
  }
}

const selector: Selector = (state) => {
  return {
    list: state.result.list.map((items, index) => {
      const sum = items.reduce((acc, cur) => parseFloatNumber(acc + cur), 0)
      return { index, items, sum }
    }),
    target: parseFloatNumber(state.input.target),
    status: state.result.status,
  }
}

const useResultTable = () => {
  const reduxState = useSelector(selector)
  const reduxDispatch = useDispatch()
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (reduxState.status === 1) {
      dispatch({ type: 'set-target', target: reduxState.target })
    }
  }, [reduxState.status, reduxState.target])

  useEffect(() => {
    dispatch({ type: 'set-page', page: 0 })
  }, [reduxState.list])

  const onResultClean = () => {
    reduxDispatch(resultClean())
  }

  const onSwitchOrder = () => {
    dispatch({ type: 'switch-order' })
  }

  const onSetOrderBy = (orderBy: string) => {
    if (state.headCells.map(({ id }) => id).includes(orderBy)) {
      dispatch({ type: 'set-order-by', orderBy })
    }
  }

  const generateItemList: GenerateItemList = useCallback(
    ({ list }) => {
      const itemList = list.map((item) => ({
        ...item,
        diff: parseFloatNumber(state.target - item.sum),
      }))
      itemList.sort((a, b) => {
        const diff =
          state.orderBy === 'index'
            ? a.index - b.index
            : state.orderBy === 'items'
            ? a.items.length - b.items.length
            : state.orderBy === 'diff'
            ? a.diff - b.diff
            : 0
        return diff * (state.order === 'asc' ? 1 : -1)
      })
      return itemList
    },
    [state.target, state.order, state.orderBy, state.page, state.rowsPerPage]
  )

  const onChangePage = (event: any, page: number) => {
    dispatch({ type: 'set-page', page })
  }

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'set-rows-per-page',
      rowsPerPage: parseInt(event.target.value, 10),
    })
    dispatch({ type: 'set-page', page: 0 })
  }

  return {
    isCalculating: reduxState.status === 1,
    ...state,
    list: generateItemList({ list: reduxState.list }),
    onResultClean,
    onSwitchOrder,
    onSetOrderBy,
    onChangePage,
    onChangeRowsPerPage,
  }
}

export default useResultTable
