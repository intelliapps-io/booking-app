import React from "react";
import moment, { Moment } from "moment";
import { CalendarEvent } from "./CalendarTypes";

interface DayTimelineProps {
  date: Moment
  hourHeight: number
  events: Array<CalendarEvent> 
}

export const DayTimeline: React.FC<DayTimelineProps> = props => {
  const { date } = props

  // time cells
  let timeCells: React.ReactNode[] = []
  for (let i = 0; i < 24; i++)
    timeCells.push(<div style={{ height: props.hourHeight, borderBottom: '#000 1px solid' }}></div>)

  // time blocks
  const minuteToHeight = props.hourHeight / 60
  let additionalOffset = 0
  let timeblock: React.ReactNode[] = []
  props.events.forEach(event => {
    if (moment(event.begins).startOf('day').isSame(date.clone().startOf('day'))) {
      const startTop = (moment(event.begins).endOf('day').diff(moment(event.begins), 'minutes') + 60) * minuteToHeight
      const height = (moment(event.ends).diff(moment(event.begins), 'minutes')) * minuteToHeight

      timeblock.push(<div
        key={moment(event.begins).toString()}
        className='timeblock'
        style={{
          top: -1 * (startTop + additionalOffset),
          height
        }}
      >
        {moment(event.begins).format('hh:mm')}
        </div>
      )

      additionalOffset += height
    }
  })
  
  return(
    <div className='day-timeline'>
      <h4>{date.format('MM/DD')}</h4>
      <hr style={{ margin: 0 }}/>
      {timeCells}

      {timeblock}
      
      <div className='timeblock' style={{ background: 'red' }}></div>
    </div>
  );
}