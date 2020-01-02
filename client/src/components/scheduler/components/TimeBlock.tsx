import React, { useLayoutEffect, useState } from "react";
import { SchedularEvent } from "../SchedulerTypes";
import moment from "moment";
import { Icon } from "antd";

interface TimeBlockProps {
  dayNumber: number
  startMin: number
  endMin: number
  event: SchedularEvent
  onClick?: (event: SchedularEvent) => void
}

const getDuration = (minDuration: number) => {
  let hours = Math.round(minDuration / 60)
  let min = minDuration % 60
  return `${hours} hrs ${min} min`
}

export const TimeBlock: React.FC<TimeBlockProps> = props => {
  const [startCell, setStartCell] = useState<ClientRect | DOMRect | null>(null)// displayed of rerender

  useLayoutEffect(() => {
    const startElement = document.getElementById(`${props.dayNumber}-${props.startMin - props.startMin % 60}`)
    if (startElement) setStartCell(startElement.getBoundingClientRect())
  }, [props])

  if (!startCell)
    return <div />

  const pixelsPerMinute = startCell.height / 60
  const top = startCell.top + window.scrollY + ((props.startMin % 60) * pixelsPerMinute)
  const height = (props.endMin - props.startMin) * pixelsPerMinute

  return (
    <div
      className="time-block"
      style={{
        width: startCell.width * 0.90,
        left: startCell.left + window.scrollX,
        top,
        height
      }}
      onClick={event => {
        event.stopPropagation()
        if (props.onClick) props.onClick(props.event)
      }}
    >
      <div className='header'>
        <h5><Icon style={{ fontSize: 14, marginRight: 7 }} css="width: 40px" type="clock-circle" /> {moment().startOf('day').add(props.startMin, 'minutes').format('H:mm')} - {moment().startOf('day').add(props.endMin, 'minutes').format('H:mm')}</h5>
        <h5><Icon style={{ fontSize: 14, marginRight: 7 }} type="dashboard" /> {getDuration(props.endMin - props.startMin)}</h5>
      </div>
    </div>
  );
}

