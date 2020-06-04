export function parseFloatNumber(num: number | string) {
  if (typeof num === 'string') {
    num =
      (/^\(.+\)$/.test(num) ? -1 : 1) *
      parseFloat(num.trim().replace(/(^\()|(\)$)/g, ''))
  }
  return parseFloat(num.toPrecision(12))
}

export * from './findTarget'
