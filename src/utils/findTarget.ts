import { parseFloatNumber } from './index'

interface FindTarget {
  (
    list: number[],
    target: number,
    range: number,
    start: number,
    end: number,
    cur: number[],
    result: number[][]
  ): void
}

export const findTarget: FindTarget = (
  list,
  target,
  range,
  start,
  end,
  cur,
  result
) => {
  if (target < -range) return
  if (target <= range) {
    result.push([...cur])
    return
  }
  const limit = end <= list.length - 1 ? end : list.length - 1
  for (let i = start; i <= limit; ++i) {
    findTarget(
      list,
      parseFloatNumber(target - list[i]),
      range,
      i + 1,
      end,
      [...cur, list[i]],
      result
    )
    while (i <= limit - 1 && list[i] === list[i + 1]) ++i
  }
  return
}
