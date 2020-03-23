import moment, { Moment } from 'moment'

export const createDateArray = (startFrom: Moment, length: number): Moment[] => {
  let arr: Moment[] = []
  for (let i = 0; i < length; i++)
    arr.push(startFrom.clone().add(i, 'days'))
  return arr
}

export const shiftDateArray = (dateArray: Moment[], direction: 'prev' | 'next', unit: 'day' | 'week' | 'month', count?: number) => {
  const sign = direction === 'prev' ? -1 : 1
  
  // default count
  if (!count)
    count = 1
  
  return dateArray.map(date => {
    if (unit === 'week')
      return date.add(sign * count! * 7, 'days')
    else
      return date.add(sign * count!, unit)
  })
}