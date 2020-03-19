import React from "react";
import moment from "moment";

interface TimeBarProps {
  hourHeight: number
  controlBarOffset: number
}

export const TimeBar: React.FC<TimeBarProps> = props => {

  // let timeCells: React.ReactNode[] = []
  // for (let i = 0; i < 24; i++)
  //   timeCells.push(<div className='time-cell' style={{ height: props.hourHeight }}></div>)

  let timecells: React.ReactNode[] = []
  for (let i = 0; i < 24; i++) {
    const hour = i
    timecells.push(
      <div
        style={{
          height: i === 0 ? props.hourHeight + 1 : props.hourHeight,
          marginTop: i === 0 ? -1 : undefined
        }}
        key={i}
        className='time-cell'
      >
        <h4>{moment().startOf('day').add(hour, 'hours').format('HH:mm')}</h4>
      </div>
    )
  }

  return (
    <div className='time-bar'>
      <div className='day-header' style={{ top: props.controlBarOffset }}>
        <h4 style={{ opacity: 0 }}>t</h4>
      </div>
      {timecells}
    </div>
  );
}