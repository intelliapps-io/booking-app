import moment, { Moment } from 'moment'

export const createDateArray = (startFrom: Moment, length: number): Moment[] => {
  let arr: Moment[] = []
  for (let i = 0; i < length; i++) 
    arr.push(startFrom.clone().add(i, 'days'))
  return arr
}

export const shiftDateArray = (dateArray: Moment[], direction: 'prev' | 'next', unit: 'day' | 'week' | 'month', count?: number) => {
  const sign = direction === 'prev' ? -1 : 1
  return dateArray.map(date => date.add(count ? sign * count : sign * 1, unit))
}