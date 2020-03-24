import React from "react"
import { Moment } from "moment";
import { Button, Typography, Icon, Radio } from "antd";
import { shiftDateArray } from "./helpers";
import { CalendarViewState } from "./Calendar";

interface ControlCalendarBarProps {
  centerDateState: [Moment, (newState: Moment) => void]
  viewState: [CalendarViewState, (newState: CalendarViewState) => void]
  height: number
}

export const ControlCalendarBar: React.FC<ControlCalendarBarProps> = props => {
  const [centerDate, setCenterDate] = props.centerDateState

  const shiftDates = (direction: 'prev' | 'next', unit: 'day' | 'week' | 'month', count?: number) => {
    const sign = direction === 'prev' ? -1 : 1

    // default count
    if (!count)
      count = 1

    setCenterDate(centerDate.clone().add(sign * count!, unit))
  }

  return (
    <div className='control-calendar-bar' style={{ height: props.height }}>
      <div className='view-controls'>
        <Radio.Group value={props.viewState[0]} onChange={(e) => props.viewState[1](e.target.value)} size="small">
          <Radio.Button value={CalendarViewState['DAY']}><Icon type='schedule' /></Radio.Button>
          <Radio.Button value={CalendarViewState['THREEDAY']}><Icon type='project' /></Radio.Button>
          <Radio.Button value={CalendarViewState['WEEK']}><Icon type='calendar' /></Radio.Button>
          <Radio.Button value={CalendarViewState['MONTH']}><Icon type='appstore' /></Radio.Button>
        </Radio.Group>
      </div>
      <div className='date-controls'>
        <Button onClick={() => shiftDates('prev', 'month', 1)} icon='double-left' className='icon-btn month-dec'></Button>
        <Button onClick={() => shiftDates('prev', 'week', 1)} icon='left' className='icon-btn month-dec'></Button>
        {props.viewState[0] !== CalendarViewState['WEEK'] && <Button onClick={() => shiftDates('prev', 'day', 1)} icon='step-backward' className='icon-btn month-dec'></Button>}
        <Typography.Text strong={true} style={{ fontSize: 16 }}>{centerDate.format('MMMM, YYYY')}</Typography.Text>
        {props.viewState[0] !== CalendarViewState['WEEK'] && <Button onClick={() => shiftDates('next', 'day', 1)} icon='step-forward' className='icon-btn month-inc'></Button>}
        <Button onClick={() => shiftDates('next', 'week', 1)} icon='right' className='icon-btn month-inc'></Button>
        <Button onClick={() => shiftDates('next', 'month', 1)} icon='double-right' className='icon-btn month-inc'></Button>
      </div>
    </div>
  );
}