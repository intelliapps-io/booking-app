import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import '../lib/less/index.less'
import { DayPicker } from '../components/dayPicker/DayPicker';

//parent component for state
const Parent = () => {
  return (
    <div style={{
      padding: 20
    }}>
      <DayPicker
        style={{ maxWidth: 500 }}
        onChange={(day) => console.log(day)}
      />
    </div>
  )
}

storiesOf('Day Picker', module)
  .add('Basic Example', () => <Parent />)

