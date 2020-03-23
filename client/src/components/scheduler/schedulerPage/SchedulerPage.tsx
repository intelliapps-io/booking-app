import React, { useState, useContext } from "react";
import { Scheduler, SchedulerView } from "../Scheduler";
import { useEmployeeSchedulesQuery, useCreateEmployeeScheduleMutation } from "../../../lib/codegen"
import { SchedularEvent } from "../SchedulerTypes";
import { RouteComponentProps } from "react-router-dom";
import { Calendar } from "../../calendar/Calendar";

export const SchedulerPage: React.FC<RouteComponentProps<{ userId: string }>> = props => {
  const [view, setView] = useState<SchedulerView>({
    week: {
      weekNumber: 1,
      year: 2020
    }
  })

  const { userId } = props.match.params
  const { data, error, loading } = useEmployeeSchedulesQuery({ variables: { data: { employeeId: userId } } })
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

  return (
    <div style={{ background: '#fff', overflowY: 'auto', overflowX: 'hidden' }}>
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
            begins: new Date('Tue Mar 17 2020 15:00:00 GMT-0500'),
            ends: new Date('Tue Mar 17 2020 20:00:00 GMT-0500'),
            isRecurring: true,
            recurrenceInterval: 2,
            recursOn: [false, true, false, true, false, false, false],
            excludedDates: [
              new Date('Fri Mar 27 2020 22:13:00 GMT-0500')
            ],
          }
        ]}
      />
    </div>
  );
}