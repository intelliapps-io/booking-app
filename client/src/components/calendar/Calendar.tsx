import React, { useState } from "react"
import moment, { Moment } from "moment"
import './Calendar.less'
import { createDateArray } from "./helpers"
import { DayTimeline } from "./DayTimeline"
import { TimeBar } from "./TimeBar"
import { CalendarEvent } from "./CalendarTypes"
import { ControlCalendarBar } from "./ControlCalendarBar"

interface CalendarProps {
  events: Array<CalendarEvent>
}

export const Calendar: React.FC<CalendarProps> = props => {
  const hourHeight = 55, controlBarHeight = 50
  const [weekArray, setWeekArray] = useState<Moment[]>(createDateArray(moment().startOf('week'), 7))

  const totalHeight = (24 * hourHeight + controlBarHeight) - 25

  return (
    <div>
      <ControlCalendarBar weekState={[weekArray, setWeekArray]} height={controlBarHeight}/>
      <div className='calendar-wrapper' style={{ height: totalHeight }}>
        <TimeBar hourHeight={hourHeight} controlBarOffset={controlBarHeight} />
        {weekArray.map(day =>
          <DayTimeline
            key={day.format('MM/DD/YYYY')}
            date={day}
            events={props.events}
            hourHeight={hourHeight}
            controlBarOffset={controlBarHeight}
          />
        )}
      </div>
    </div>
  );
}