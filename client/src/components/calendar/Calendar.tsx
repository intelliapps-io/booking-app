import React, { useState } from "react"
import moment, { Moment } from "moment"
import './Calendar.less'
import { createDateArray } from "./helpers"
import { DayTimeline } from "./DayTimeline"
import { TimeBar } from "./TimeBar"
import { CalendarEvent } from "./CalendarTypes"

interface CalendarProps {
  events: Array<CalendarEvent>
}

export const Calendar: React.FC<CalendarProps> = props => {
  const hourHeight = 50
  const [weekArray, setWeekArray] = useState<Moment[]>(createDateArray(moment().startOf('week'), 7))

  return (
    <div>
      <div className='calendar-wrapper'>
        <TimeBar hourHeight={hourHeight} />
        {weekArray.map(day =>
          <DayTimeline key={day.format('MM/DD/YYYY')} date={day} events={props.events} hourHeight={hourHeight} />
        )}
      </div>
    </div>
  );
}