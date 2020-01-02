import React from "react"
import moment, { Moment } from "moment"

/**
 * Day Title for Scheduler Component
 */

interface DayTitleProps {
  date: Moment
}

export const DayTitle: React.FC<DayTitleProps> = ({ date }) => {
  return(
    <div className="day-title" style={{ textAlign: 'center' }}>
      <h4>{date.format('ddd - MMM')}</h4>
      <h2>{date.format('D')}</h2>
    </div>
  );
}

/**
 * Time Title for Scheduler Component
 * @property totalMinutes is number of minutes from start of day
 */

interface TimeTitleProps {
  totalMinutes: number
}

export const TimeTitle: React.FC<TimeTitleProps> = ({ totalMinutes }) => {
  // error checking
  if (totalMinutes < 0 || totalMinutes > 1440)
    throw `totalMinutes of ${totalMinutes} is invalid, ust be greater than 0 and less than 1440.`

  const date = moment().startOf('day').add(totalMinutes, 'minutes')

  return <h4 className='time-title'>{date.format('HH:mm')}</h4>;
}