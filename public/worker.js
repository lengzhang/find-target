/**
 * Calculation start
 * {
 *    code: 0
 * }
 *
 * Calculation return each result
 * {
 *    code: 1
 *    data: number[]
 * }
 *
 * Calculation done
 * {
 *    code: 2
 * }
 */

function sendResponse(code, list) {
  switch (code) {
    case 0:
      self.postMessage({ code })
      break

    case 1:
      if (Array.isArray(list)) self.postMessage({ code, list })
      break

    case 2:
      self.postMessage({ code })
      break

    default:
      break
  }
}

function parseFloatNumber(num) {
  if (typeof num === 'string') {
    num =
      (/^\(.+\)$/.test(num) ? -1 : 1) *
      parseFloat(num.trim().replace(/(^\()|(\)$)/g, ''))
  }
  return parseFloat(num.toPrecision(12))
}

/**
 *
 * @param {*} list
 * @param {*} target
 * @param {*} range
 * @param {*} start
 * @param {*} end
 * @param {*} cur
 * @param {*} result
 * @param {*} numResult
 */
function findTarget(
  list,
  target,
  range,
  start,
  end,
  cur,
  result,
  numResult = 0
) {
  if (numResult > 0 && result.length >= numResult) return
  if (target < -range) return
  if (target <= range) {
    result.push([...cur])
    sendResponse(1, [...cur])
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
      result,
      numResult
    )
    while (i <= limit - 1 && list[i] === list[i + 1]) ++i
  }
  return
}

self.onmessage = function (e) {
  const { list, target, range, numResult } = e.data
  sendResponse(0)

  const result = []
  findTarget(list, target, range, 0, list.length, [], result, numResult)

  sendResponse(2)
}
