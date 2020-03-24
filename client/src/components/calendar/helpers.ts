import moment, { Moment } from 'moment'
import { CalendarViewState } from './Calendar'

export const createDateArray = (centerDate: Moment, viewState: CalendarViewState): Moment[] => {
  let arr: Moment[] = []
  
  switch (viewState) {
    case CalendarViewState['WEEK']:
      const startDate = centerDate.clone().startOf('week')
      for (let i = 0; i < 7; i++) 
        arr.push(startDate.clone().add(i, 'days'))
      break
    case CalendarViewState['THREEDAY']:
      arr = [
        centerDate.clone().subtract(1, 'day'),
        centerDate,
        centerDate.clone().add(1, 'day')
      ]
      break
    case CalendarViewState['DAY']:
      arr = [centerDate]
      break
  }    

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