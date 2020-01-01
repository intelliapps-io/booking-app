import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import { Scheduler, SchedulerProps } from '../components/scheduler/Scheduler';
import { SchedularEventForm } from '../components/scheduler/components/SchedularEventForm';


storiesOf('Scheduler', module)
  .add('Scheduler Component', () => {
    const [view, setView] = useState<SchedulerProps['view']>({
      week: {
        weekNumber: 47,
        year: 2019
      },
      time: {
        startMinutes: 540,
        endMinutes: 1200
      }
    })
    return (
      <Scheduler
        view={view}
        style={{ margin: 20 }}
      />
    )
  })
  .add('Create Event Form', () => {
    const visibleState = useState(true)
    return (
      <SchedularEventForm
        title="Create Timeslot"
        submitText="Submit"
        onSubmit={data => console.log(data)}
        createEventDate={new Date('12/20/2019')}
        visibleState={visibleState}
      />
    )
  })
  .add('Edit Event Form', () => {
    const visibleState = useState(true)
    return (
      <SchedularEventForm
        title="Create Timeslot"
        submitText="Submit"
        onSubmit={data => console.log(data)}
        editEventData={{
          id: '2ee3di3j3',
          begins: new Date('Fri Dec 20 2019 15:33:00 GMT-0500'),
          ends: new Date('Fri Dec 20 2019 22:13:00 GMT-0500'),
          isRecurring: true,
          recurrenceInterval: 1,
          recursOn: [true, true, false, true, true, false, false]
        }}
        visibleState={visibleState}
      />
    )
  })