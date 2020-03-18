import moment, { Moment } from 'moment'

export const createDateArray = (startFrom: Moment, length: number): Moment[] => {
  let arr: Moment[] = []
  for (let i = 0; i < length; i++) 
    arr.push(startFrom.clone().add(i, 'days'))
  return arr
}