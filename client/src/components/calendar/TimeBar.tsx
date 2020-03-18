import React from "react";

interface TimeBarProps {
  hourHeight: number
}

export const TimeBar: React.FC<TimeBarProps> = props => {

  let timecells: React.ReactNode[] = []
  for (let i = 0; i < 24; i++) {
    const hour = i
    timecells.push(
      <div
        style={{ height: props.hourHeight }}
        key={i}
      >
        {hour}
      </div>
    )
  }

  return (
    <div className='time-bar' style={{ marginTop: 20 }}>
      {timecells}
    </div>
  );
}