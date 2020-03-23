import React from "react"
import { Moment } from "moment";
import { Button, Typography, Icon, Radio } from "antd";
import { shiftDateArray } from "./helpers";
import { CalendarViewState } from "./Calendar";

interface ControlCalendarBarProps {
  dateViewState: [Moment[], (newState: Moment[]) => void]
  viewState: [CalendarViewState, (newState: CalendarViewState) => void]
  height: number
}

export const ControlCalendarBar: React.FC<ControlCalendarBarProps> = props => {
  const [dateViewArray, setDateViewArray] = props.dateViewState

  return (
    <div className='control-calendar-bar' style={{ height: props.height }}>
      <div className='view-controls'>
        <Radio.Group value={props.viewState[0]} onChange={(e) => props.viewState[1](e.target.value)} size="small">
          <Radio.Button value={CalendarViewState['DAY']}><Icon type='schedule'/></Radio.Button>
          <Radio.Button value={CalendarViewState['THREEDAY']}><Icon type='project'/></Radio.Button>
          <Radio.Button value={CalendarViewState['WEEK']}><Icon type='calendar'/></Radio.Button>
        </Radio.Group>
      </div>
      <div className='date-controls'>
        <Button onClick={() => setDateViewArray(shiftDateArray(dateViewArray, 'prev', 'month', 1))} icon='double-left' className='icon-btn month-dec'></Button>
        <Button onClick={() => setDateViewArray(shiftDateArray(dateViewArray, 'prev', 'week', 1))} icon='left' className='icon-btn month-dec'></Button>
        <Typography.Text strong={true} style={{ fontSize: 16 }}>{dateViewArray[0].format('MMMM, YYYY')}</Typography.Text>
        <Button onClick={() => setDateViewArray(shiftDateArray(dateViewArray, 'next', 'week', 1))} icon='right' className='icon-btn month-inc'></Button>
        <Button onClick={() => setDateViewArray(shiftDateArray(dateViewArray, 'next', 'month', 1))} icon='double-right' className='icon-btn month-inc'></Button>
      </div>
    </div>
  );
}