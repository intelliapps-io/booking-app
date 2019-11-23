import React from 'react';
import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import { Scheduler } from '../components/scheduler/Scheduler';

const element = () => (
  <div>
      <Scheduler
    view={{
      week: {
        weekNumber: 47,
        year: 2019
      },
      time: {
        startMinutes: 540,
        endMinutes: 1200
      }
    }}
    style={{ margin: 20 }}
  />
  </div>
)

storiesOf('Scheduler', module)
  .add('Basic Example', element)