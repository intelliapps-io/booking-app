import './MonthView.less'
import React from "react";
import { Calendar } from "antd";
import { CalendarEvent } from '../CalendarTypes';
import moment, { Moment } from 'moment';

interface MonthViewProps {
  events: Array<CalendarEvent>
  centerDateState: [Moment, (newState: Moment) => void]
}

export const EventItem: React.FC<{ date: Moment, events: Array<CalendarEvent>}> = props => {
  let timeblocks: React.ReactNode[] = []
  props.events.forEach(event => {
    const firstDay = moment(event.begins).startOf('week')
    const lastDay = moment(event.begins).endOf('week')

    // func
    const addTimeBlock = (_event: CalendarEvent) => {
      timeblocks.push(<div className='event-item'>start: {moment(_event.begins).format('HH:mm')} - end: {moment(_event.ends).format('HH:mm')}</div>)
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
    if (!event.isRecurring && moment(event.begins).startOf('day').isSame(props.date.clone().startOf('day'))) {
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
    <div>
     {timeblocks}
    </div>
  );
}

export const MonthView: React.FC<MonthViewProps> = props => {

  return (
    <div className='month-view'>
      <Calendar
        dateCellRender={(date) => <EventItem date={date} events={props.events} />}
        value={props.centerDateState[0]}
        onChange={(date) => date ? props.centerDateState[1](date) : undefined}
        headerRender={() => <span />}
      />
    </div>
  );
}