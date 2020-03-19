import React from "react";
import moment from "moment";
import { CalendarEvent } from "./CalendarTypes";
import { Icon } from "antd";

interface TimeBlockProps {
  event: CalendarEvent
  style: React.CSSProperties
}

export const TimeBlock: React.FC<TimeBlockProps> = props => {
  const { event } = props
  const duration = moment.duration(moment(event.ends).diff(event.begins, 'seconds'), 'seconds')

  return (
    <div
      key={moment(event.begins).toString()}
      className='timeblock'
      style={props.style}
    >
      <div className='header'>
        <h4><Icon style={{ fontSize: 14, marginRight: 7 }} css="width: 40px" type="clock-circle" /> {moment(event.begins).format('H:mm')} - {moment(event.ends).format('H:mm')}</h4>
        <h4><Icon style={{ fontSize: 14, marginRight: 7 }} type="dashboard" /> {Math.round(duration.asHours())} hrs {(Math.round(duration.asHours()) - duration.asHours()) * 60} min</h4>
      </div>
    </div>
  );
}