import React, { useState, useLayoutEffect } from "react"
import "./Scheduler.less"
import moment, { Moment } from "moment";
import { DayTitle, TimeTitle } from "./components/DateTitles";
import { TimeBlock } from "./components/TimeBlock";
import { Button, Icon } from "antd";
import { SchedularEvent } from "./SchedulerTypes"
import { SchedularEventForm } from "./components/SchedularEventForm";

export interface SchedulerView {
  week: {
    weekNumber: number
    year: number
  }
}

export interface SchedulerProps {
  viewState: [SchedulerView, (state: SchedulerView) => void]
  events: SchedularEvent[]
  onCreateEvent: (data: SchedularEvent) => void
  onEditEvent: (data: SchedularEvent) => void
  onDeleteEvent: (data: { event: SchedularEvent, excludeRecurringEvent: boolean }) => void
  style?: React.CSSProperties
}

export const Scheduler: React.FC<SchedulerProps> = props => {
  const [createEventDate, setCreateEventDate] = useState(moment())
  const [createEventFormVisible, setCreateEventFormVisible] = useState(false)
  const [editEvent, setEditEvent] = useState<null | SchedularEvent>(null)
  const [view] = props.viewState
  const firstDay = moment().year(view.week.year).week(view.week.weekNumber).day("Monday")
  const lastDay = firstDay.clone().add(7, 'days')

  function handleWeekChange(mode: 'inc' | 'dec') {
    const { weekNumber, year } = view.week
    if (weekNumber === 52 && mode === 'inc')
      props.viewState[1]({ week: { weekNumber: 1, year: year + 1 } })
    else if (weekNumber === 1 && mode === 'dec')
      props.viewState[1]({ week: { weekNumber: 52, year: year - 1 } })
    else
      props.viewState[1]({ week: { weekNumber: mode === 'inc' ? weekNumber + 1 : weekNumber - 1, year } })
  }

  // it works but is it worth it?
  useLayoutEffect(() => {
    const forceUpdate = () => {
      handleWeekChange('inc')
      setTimeout(() => handleWeekChange('dec'), 1)
    };
    window.addEventListener('resize', forceUpdate);
    return () => {
      window.removeEventListener('resize', forceUpdate);
    };
  }, [])

  const DayHeaders = () => {
    let dayHeaders: React.ReactElement[] = []
    for (let i = 0; i < 7; i++)
      dayHeaders.push(<th className="day-header" key={i}><DayTitle date={firstDay.clone().add(i, "day")} /></th>)
    return dayHeaders
  }

  const TimeRows = () => {
    let timeRows: React.ReactElement[] = []
    for (let i = 0; i < 1440; i += 60) {
      let timeCol: React.ReactElement[] = [
        <td className="time-row-cell" key={i}>
          <TimeTitle totalMinutes={i} />
        </td>
      ]

      for (let col = 0; col < 7; col++)
        timeCol.push(
          <td key={col} className="time-cell" id={`${col}-${i}`} onClick={() => {
            setCreateEventDate(moment(firstDay).clone().startOf('day').add(col, 'days').add(i, 'minutes'))
            setCreateEventFormVisible(true)
          }}>
            <div> <Icon type="plus" style={{ color: '#c7c7c7' }}/> </div>
          </td>
        )

      timeRows.push(<tr>{timeCol}</tr>)
    }

    return timeRows
  }

  function renderTimeblocks(): React.ReactNode[] {
    let timeblocks: React.ReactNode[] = []

    const isExcludedDate = (event: SchedularEvent, dayNumber: number): boolean => {
      const date = moment(firstDay).clone().add(dayNumber, 'days')
      if (!event.excludedDates || event.excludedDates.length === 0)
        return false
      for (let i = 0; i < event.excludedDates.length; i++)
        if (moment(event.excludedDates[i]).format('YYYY-MM-DD') === date.format('YYYY-MM-DD'))
          return true
      return false
    }

    props.events.forEach(event => {
      // render single event
      if (!event.isRecurring && moment(event.begins).isBetween(firstDay, lastDay))
        timeblocks.push(<TimeBlock
          event={event}
          onClick={event => setEditEvent(event)}
          key={event.id}
          dayNumber={moment(event.begins).day() - 1}
          startMin={moment(event.begins).diff(moment(event.begins).startOf('day'), 'minutes')}
          endMin={moment(event.ends).diff(moment(event.ends).startOf('day'), 'minutes')}
        />)

      // render recurring event first date
      if (moment(event.begins).diff(firstDay, 'weeks') === 0 && event.recursOn && event.isRecurring)
        event.recursOn.forEach((dayEnabled, dayNumber) => {
          if (isExcludedDate(event, dayNumber)) return
          if (dayEnabled && dayNumber >= moment(event.begins).day() - 1) timeblocks.push(<TimeBlock
            event={event}
            onClick={event => setEditEvent(event)}
            key={event.id}
            dayNumber={dayNumber}
            startMin={moment(event.begins).diff(moment(event.begins).startOf('day'), 'minutes')}
            endMin={moment(event.ends).diff(moment(event.ends).startOf('day'), 'minutes')}
          />)
        })

      // render recurring event first date
      if (event.isRecurring && event.recursOn && event.recurrenceInterval && (!event.recurrenceEndsOn || moment(event.recurrenceEndsOn).isBefore(lastDay)))
        if (moment(event.begins).diff(firstDay, 'weeks') % event.recurrenceInterval === 0 && moment(event.begins).diff(firstDay, 'weeks') <= 0) {
          if (moment(event.begins).isBefore(firstDay))
            event.recursOn.forEach((dayEnabled, dayNumber) => {
              if (dayEnabled && isExcludedDate(event, dayNumber)) return
              if (dayEnabled) timeblocks.push(<TimeBlock
                event={event}
                onClick={event => setEditEvent(event)}
                key={`${event.id}${dayNumber}`}
                dayNumber={dayNumber}
                startMin={moment(event.begins).diff(moment(event.begins).startOf('day'), 'minutes')}
                endMin={moment(event.ends).diff(moment(event.ends).startOf('day'), 'minutes')}
              />)
            })
        }
    })
    return timeblocks
  }

  return (
    <div className="scheduler-container" style={props.style}>

      <SchedularEventForm
        submitText="Create Event"
        onSubmit={props.onCreateEvent}
        title="Create Event"
        visibleState={[createEventFormVisible, setCreateEventFormVisible]}
        createEventDate={createEventDate}
      />

      {editEvent && <SchedularEventForm 
        submitText="Save"
        onSubmit={props.onEditEvent}
        title="Edit Event"
        visibleState={[editEvent ? true : false, state => setEditEvent(null)]}
        editEventData={editEvent ? editEvent : undefined}
        onDelete={event => props.onDeleteEvent(event)}
      />}

      {renderTimeblocks()}

      <h4>{firstDay.format('YYYY')}</h4>

      <table>
        <colgroup >
          <col width="50"></col>
        </colgroup>

        {/* Calendar Date Header */}
        <thead>
          <tr>
            <th style={{ background: '#ffffffad', zIndex: 550 }}>
              <Button onClick={() => handleWeekChange('dec')}><Icon type="caret-left" /></Button>
              <Button onClick={() => handleWeekChange('inc')}><Icon type="caret-right" /></Button>
            </th>
            {DayHeaders()}
          </tr>
        </thead>

        <tbody>
          {/* Time Titles */}
          {TimeRows()}

        </tbody>
      </table>
    </div>
  );
}