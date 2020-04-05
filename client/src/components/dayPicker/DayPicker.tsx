import './DayPicker.less'
import React from "react";
import { Calendar, Button, Typography } from "antd";
import moment, { Moment } from "moment";

interface DayPickerProps {
  style?: React.CSSProperties
  onChange?: (day: Moment | undefined) => void
}

export const DayPicker: React.FC<DayPickerProps> = props => {
  return (
    <div className='day-picker-wrapper' style={props.style}>
      <Calendar
        style={{
          border: '1px solid #d9d9d9',
          borderRadius: 4,
          fontSize: 12
        }}
        onChange={props.onChange}
        disabledDate={(currentDate: moment.Moment) => {
          const isBlocked = currentDate.isBefore()
          if (isBlocked) {
            return true
          }
          return false
        }}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const current = value.clone()
          const handleMonthChange = (method: 'inc' | 'dec') => onChange!(current.add(method === 'inc' ? 1 : -1, 'month'))
          const handleDayChange = (method: 'inc' | 'dec') => onChange!(current.add(method === 'inc' ? 1 : -1, 'day'))
          if (!onChange) onChange = (value: Moment) => { }
          return (
            <div className='picker-header'>
              <Button onClick={() => handleMonthChange('dec')} icon='double-left' className='icon-btn month-dec' style={{fontSize: 12}}></Button>
              <Button onClick={() => handleDayChange('dec')} icon='left' className='icon-btn month-dec' style={{fontSize: 12}}></Button>
              <Typography.Text strong={true} style={{ fontSize: 11 }}>{current.format('MMM, YYYY')}</Typography.Text>
              <Button onClick={() => handleDayChange('inc')} icon='right' className='icon-btn month-inc' style={{fontSize: 12}}></Button>
              <Button onClick={() => handleMonthChange('inc')} icon='double-right' className='icon-btn month-inc' style={{fontSize: 12}}></Button>
            </div>
          )
        }}
        fullscreen={false}
      />
    </div>
  );
}