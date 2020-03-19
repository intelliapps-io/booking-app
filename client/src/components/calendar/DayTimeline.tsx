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
    if (moment(event.begins).startOf('day').isSame(date.clone().startOf('day'))) {
      const startTop = (moment(event.begins).endOf('day').diff(moment(event.begins), 'minutes') + 60) * minuteToHeight
      const height = (moment(event.ends).diff(moment(event.begins), 'minutes')) * minuteToHeight

      timeblocks.push(<TimeBlock event={event} style={{
        top: -1 * (startTop + additionalOffset),
        height
      }}/>)

      additionalOffset += height
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