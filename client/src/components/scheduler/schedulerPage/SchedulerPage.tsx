import React, { useState, useContext } from "react";
import { Scheduler, SchedulerView } from "../Scheduler";
import { useEmployeeSchedulesQuery, useCreateEmployeeScheduleMutation } from "../../../lib/codegen"
import { SchedularEvent } from "../SchedulerTypes";
import { RouteComponentProps } from "react-router-dom";

export const SchedulerPage: React.FC<RouteComponentProps<{ userId: string  }> > = props => {
  const [view, setView] = useState<SchedulerView>({
    week: {
      weekNumber: 1,
      year: 2020
    }
  })

  const { userId } = props.match.params
  const { data, error, loading } = useEmployeeSchedulesQuery({ variables: { data: { employeeId: userId }}})
  const [createEmployeeSchedule] = useCreateEmployeeScheduleMutation()

  const employeeSchedules = data && data.employeeSchedules ? data.employeeSchedules : []
  const events = employeeSchedules.map(({
    id,
    begins,
    ends,
    isRecurring,
    excludedDates,
    recurrenceEndsOn,
    recurrenceInterval,
    recursOn
  }): SchedularEvent => ({
    id,
    begins,
    ends,
    isRecurring,
    excludedDates: excludedDates as any,
    recurrenceEndsOn,
    recurrenceInterval: recurrenceInterval as any,
    recursOn: recursOn as any
  }))
  
  function createEvent(eventData: SchedularEvent) {
    const {
      begins,
      ends,
      isRecurring,
      excludedDates,
      recurrenceEndsOn,
      recurrenceInterval,
      recursOn
     } = eventData
    createEmployeeSchedule({
      variables: {
        data: {
          begins,
          ends,
          isRecurring,
          employeeId: userId

        }
      }
    })
  }

  console.log(data)

  return (
    <div style={{ background: '#fff', overflowY: 'auto', overflowX: 'hidden' }}>
      <Scheduler
        events={events}
        onCreateEvent={createEvent}
        onDeleteEvent={() => { }}
        onEditEvent={() => { }}
        viewState={[view, setView]}
      />
    </div>
  );
}