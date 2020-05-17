export function parseFloatNumber(num: number | string) {
  if (typeof num === 'string') num = parseFloat(num)
  return parseFloat(num.toPrecision(12))
}

export * from './findTarget'
