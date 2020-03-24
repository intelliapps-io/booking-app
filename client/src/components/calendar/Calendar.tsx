import React, { useState } from "react"
import moment, { Moment } from "moment"
import './Calendar.less'
import { createDateArray } from "./helpers"
import { DayTimeline } from "./DayTimeline"
import { TimeBar } from "./TimeBar"
import { CalendarEvent } from "./CalendarTypes"
import { ControlCalendarBar } from "./ControlCalendarBar"
import { MonthView } from "./monthView/MonthView"

export enum CalendarViewState {
  DAY = 'DAY',
  THREEDAY = 'THREEDAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH'
}

interface CalendarProps {
  events: Array<CalendarEvent>
}

export const Calendar: React.FC<CalendarProps> = props => {
  
  // component styling
  const hourHeight = 55, controlBarHeight = 50
  const totalHeight = (24 * hourHeight + controlBarHeight) - 25
  
  // view state
  const [viewState, setViewState] = useState<CalendarViewState>(CalendarViewState['WEEK'])
  const [centerDate, setCenterDate] = useState<Moment>(moment())
  const dateViewArray = createDateArray(centerDate, viewState)

  console.log(dateViewArray)
  
  // form state
  const [createEventDate, setCreateEventDate] = useState(moment())
  const [createEventFormVisible, setCreateEventFormVisible] = useState(false)
  const [editEvent, setEditEvent] = useState<null | CalendarEvent>(null)

  return (
    <div>
      <ControlCalendarBar viewState={[viewState, setViewState]} centerDateState={[centerDate, setCenterDate]} height={controlBarHeight}/>
      <div className='calendar-wrapper' style={{ height: totalHeight, display: viewState === CalendarViewState['MONTH'] ? 'none' : undefined }}>
        <TimeBar hourHeight={hourHeight} controlBarOffset={controlBarHeight} />
        {dateViewArray.map(day =>
          <DayTimeline
            key={day.format('MM/DD/YYYY')}
            date={day}
            events={props.events}
            hourHeight={hourHeight}
            controlBarOffset={controlBarHeight}
          />
        )}
      </div>
      {viewState === CalendarViewState['MONTH'] && <MonthView centerDateState={[centerDate, setCenterDate]} events={props.events} />}
    </div>
  );
}