export * from './findTarget'

export function parseFloatNumber(num: number | string) {
  if (typeof num === 'string') {
    num =
      (/^\(.+\)$/.test(num) ? -1 : 1) *
      parseFloat(num.trim().replace(/(^\()|(\)$)/g, ''))
  }
  return parseFloat(num.toPrecision(12))
}

export function formatNumber(value: string, isDecimals?: boolean) {
  if (!value) return ''
  const isNegative = value[0] === '-'
  value = isDecimals
    ? value.replace(/[^\d.]/g, '').replace(/(?<=\.\d*)\./, '')
    : value.replace(/[^\d]/g, '')

  const match = value.match(/\d*(\.\d*)?/)
  value = match
    ? match[0].replace(/^(0+)(?=([1-9]\d*(\.\d*)?)|(0(\.\d*)?))/, '')
    : ''
  return `${isNegative ? '-' : ''}${value.replace(/(^\.\d*$)/, '0$1')}`
}
