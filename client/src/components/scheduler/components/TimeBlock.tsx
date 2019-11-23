import React, { useLayoutEffect, useState } from "react";

interface TimeBlockProps {
  dayNumber: number
  startMin: number
  endMin: number
}

export const TimeBlock: React.FC<TimeBlockProps> = props => {
  const [startCell, setStartCell] = useState<ClientRect | DOMRect | null>(null)

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
    <div className="time-block" style={{
      width: startCell.width * 0.90,
      left: startCell.left + window.scrollX,
      top,
      height
    }}>
      {""}
    </div>
  );
}