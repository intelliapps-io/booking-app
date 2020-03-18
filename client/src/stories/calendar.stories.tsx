import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import '../lib/less/index.less'
import { Calendar } from '../components/calendar/Calendar'

//parent component for state
const Parent = () => {
  return (
    <div style={{
      padding: 20
    }}>
      <Calendar
        events={[
          {
            id: '2ee3di3j3',
            begins: new Date('Mon Mar 16 2020 2:33:00 GMT-0500'),
            ends: new Date('Mon Mar 16 2020 9:33:00 GMT-0500'),
            isRecurring: false
          },
          {
            id: '2ee3di3j2',
            begins: new Date('Mon Mar 16 2020 2:33:00 GMT-0500'),
            ends: new Date('Mon Mar 16 2020 9:33:00 GMT-0500'),
            isRecurring: false
          },
          {
            id: '2ee3di373',
            begins: new Date('Tue Mar 17 2020 2:00:00 GMT-0500'),
            ends: new Date('Tue Mar 17 2020 10:00:00 GMT-0500'),
            isRecurring: false
          },
          {
            id: '2ee3diwdwdwd3j3',
            begins: new Date('Fri Mar 20 2020 9:00:00 GMT-0500'),
            ends: new Date('Fri Mar 20 2020 16:30:00 GMT-0500'),
            isRecurring: true,
            recurrenceInterval: 1,
            recursOn: [true, true, false, true, true, false, false],
            excludedDates: [
              new Date('Fri Jan 03 2020 22:13:00 GMT-0500')
            ]
          }
        ]}
      />
    </div>
  )
}

storiesOf('Calendar', module)
  .add('Basic Example', () => <Parent />)