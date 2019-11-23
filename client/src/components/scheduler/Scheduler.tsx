import React from "react"
import "./Scheduler.less"
import moment from "moment";
import { DayTitle, TimeTitle } from "./components/DateTitles";
import { TimeBlock } from "./components/TimeBlock";

interface SchedulerProps {
  view: {
    week: {
      weekNumber: number
      year: number
    }
    time: {
      startMinutes: number
      endMinutes: number
    }
  }
  style?: React.CSSProperties
}

export const Scheduler: React.FC<SchedulerProps> = props => {
  const firstDay = moment().day("Monday").week(props.view.week.weekNumber).year(props.view.week.year)

  const DayHeaders = () => {
    let dayHeaders: React.ReactElement[] = []
    for (let i = 0; i < 7; i++)
      dayHeaders.push(<th className="day-header" key={i}><DayTitle date={firstDay.clone().add(i, "day").toDate()} /></th>)
    return dayHeaders
  }

  const TimeRows = () => {
    let timeRows: React.ReactElement[] = []
    for (let i = 0; i < 1440; i += 60)
      timeRows.push(<tr>
        <td className="time-row-cell" key={i}>
          <TimeTitle totalMinutes={i} />
        </td>
        <td className="time-cell" id={`0-${i}`} />
        <td className="time-cell" id={`1-${i}`} />
        <td className="time-cell" id={`2-${i}`} />
        <td className="time-cell" id={`3-${i}`} />
        <td className="time-cell" id={`4-${i}`} />
        <td className="time-cell" id={`5-${i}`} />
        <td className="time-cell" id={`6-${i}`} />
      </tr>)
    return timeRows
  }


  return (
    <div className="scheduler-container" style={props.style}>

      <TimeBlock
        dayNumber={0}
        startMin={(9 * 60)}
        endMin={(20 * 60) + 33}
      />

      <table>
        <colgroup >
          <col width="50"></col>
        </colgroup>

        {/* Calendar Date Header */}
        <thead>
          <tr>
            <th />
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