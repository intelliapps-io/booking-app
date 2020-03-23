import React from "react";
import moment, { Moment } from "moment";
import { CalendarEvent } from "./CalendarTypes";
import { TimeBlock } from "./TimeBlock";

interface DayTimelineProps {
  date: Moment
  hourHeight: number
  events: Array<CalendarEvent>
  controlBarOffset: number
}

export const DayTimeline: React.FC<DayTimelineProps> = props => {
  const { date } = props

  // time cells
  let timeCells: React.ReactNode[] = []
  for (let i = 0; i < 24; i++)
    timeCells.push(<div className='time-cell' style={{ height: props.hourHeight }}></div>)

  // time blocks
  const minuteToHeight = props.hourHeight / 60
  let additionalOffset = 0
  let timeblocks: React.ReactNode[] = []
  props.events.forEach(event => {
    const firstDay = moment(event.begins).startOf('week')
    const lastDay = moment(event.begins).endOf('week')

    // func
    const addTimeBlock = (_event: CalendarEvent) => {
      const startTop = (moment(_event.begins).endOf('day').diff(moment(_event.begins), 'minutes') + 60) * minuteToHeight
      const height = (moment(_event.ends).diff(moment(_event.begins), 'minutes')) * minuteToHeight

      timeblocks.push(<TimeBlock event={_event} style={{
        top: -1 * (startTop + additionalOffset),
        height
      }} />)

      additionalOffset += height
    }

    // func
    const isExcludedDate = (event: CalendarEvent, dayNumber: number): boolean => {
      const date = moment(firstDay).clone().add(dayNumber, 'days')
      if (!event.excludedDates || event.excludedDates.length === 0)
        return false
      for (let i = 0; i < event.excludedDates.length; i++)
        if (moment(event.excludedDates[i]).format('YYYY-MM-DD') === date.format('YYYY-MM-DD'))
          return true
      return false
    }

    // single event
    if (!event.isRecurring && moment(event.begins).startOf('day').isSame(date.clone().startOf('day'))) {
      addTimeBlock(event)
    }

    // render recurring events
    if (event.isRecurring && (!event.recurrenceEndsOn || moment(event.recurrenceEndsOn).isAfter(props.date))) {
      // do not disply recurring event before first date
      const isBefore = moment(event.begins).isAfter(moment(props.date).add(1, 'day'))

      // do not display recurring event after ending date
      const isAfterEnd = event.recurrenceEndsOn && moment(event.recurrenceEndsOn).isAfter(props.date)

      // week number
      const startWeekNumber = moment(event.begins).week()
      const thisWeekNumber = moment(props.date).week()

      // recurance interval


      if (event.recursOn && (!isBefore || startWeekNumber === thisWeekNumber) && !isAfterEnd) {
        const dayNumer = Math.abs(moment(props.date).startOf('week').diff(props.date, 'days'))
        console.log(dayNumer)
        if (event.recursOn[dayNumer])
          addTimeBlock(event)
      } 
    }
  })

  return (
    <div className='day-timeline'>
      <div className='day-header' style={{ top: props.controlBarOffset }}>
        <h4>{date.format('MM/DD')}</h4>
      </div>
      {timeCells}

      {timeblocks}
    </div>
  );
}