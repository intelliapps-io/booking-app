import React from "react"
import { Moment } from "moment";
import { Button, Typography } from "antd";
import { shiftDateArray } from "./helpers";

interface ControlCalendarBarProps {
  weekState: [Moment[], (newState: Moment[]) => void]
  height: number
}

export const ControlCalendarBar: React.FC<ControlCalendarBarProps> = props => {
  const [weekArray, setWeekArray] = props.weekState

  return (
    <div className='control-calendar-bar' style={{ height: props.height}}>
      <Button onClick={() => setWeekArray(shiftDateArray(weekArray, 'prev', 'month', 1))} icon='double-left' className='icon-btn month-dec'></Button>
      <Button onClick={() => setWeekArray(shiftDateArray(weekArray, 'prev', 'week', 1))} icon='left' className='icon-btn month-dec'></Button>
      <Typography.Text strong={true} style={{ fontSize: 16 }}>{weekArray[0].format('MMMM, YYYY')}</Typography.Text>
      <Button onClick={() => setWeekArray(shiftDateArray(weekArray, 'next', 'week', 1))} icon='right' className='icon-btn month-inc'></Button>
      <Button onClick={() => setWeekArray(shiftDateArray(weekArray, 'next', 'month', 1))} icon='double-right' className='icon-btn month-inc'></Button>
    </div>
  );
}