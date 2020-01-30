import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import { Scheduler, SchedulerView } from '../components/scheduler/Scheduler';
import { SchedularEventForm } from '../components/scheduler/components/SchedularEventForm';


storiesOf('Scheduler', module)
  .add('Scheduler Component', () => {
    const [view, setView] = useState<SchedulerView>({
      week: {
        weekNumber: 1,
        year: 2020
      }
    })
    return (
      <Scheduler
        viewState={[view, setView]}
        events={[
          {
            id: '2ee3di3j3',
            begins: new Date('Fri Dec 27 2019 2:33:00 GMT-0500'), 
            ends: new Date('Fri Dec 27 2019 9:33:00 GMT-0500'),
            isRecurring: false
          },
          {
            id: '2ee3di373',
            begins: new Date('Wed Jan 01 2020 2:00:00 GMT-0500'), 
            ends: new Date('Wed Jan 01 2020 10:00:00 GMT-0500'),
            isRecurring: false
          },
          {
            id: '2ee3diwdwdwd3j3',
            begins: new Date('Fri Dec 20 2019 9:00:00 GMT-0500'),
            ends: new Date('Fri Dec 20 2019 16:30:00 GMT-0500'),
            isRecurring: true,
            recurrenceInterval: 1,
            recursOn: [true, true, false, true, true, false, false],
            excludedDates: [
              new Date('Fri Jan 03 2020 22:13:00 GMT-0500')
            ]
          }
        ]}
        onDeleteEvent={data => console.log(data)}
        onCreateEvent={data => console.log(data)}
        onEditEvent={data => console.log(data)}
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
        onDelete={data => console.log(data)}
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