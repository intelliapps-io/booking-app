import React, { useState } from "react";
import { Scheduler, SchedulerView } from "../../../components/scheduler/Scheduler";
import { Frame } from "../../../components/frame/Frame";
import { useEmployeeSchedulesQuery } from "../../../lib/codegen"
import { SchedularEvent } from "../../../components/scheduler/SchedulerTypes";

interface SchedulerPageProps {

}

export const SchedulerPage: React.FC<SchedulerPageProps> = props => {
  const [view, setView] = useState<SchedulerView>({
    week: {
      weekNumber: 1,
      year: 2020
    }
  })

  const { data, error, loading } = useEmployeeSchedulesQuery()

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

  return (
    <div style={{ background: '#fff', padding: '5 px', height: 500, overflowY: 'auto', overflowX: 'hidden' }}>
      <Scheduler
        events={events}
        onCreateEvent={() => { }}
        onDeleteEvent={() => { }}
        onEditEvent={() => { }}
        viewState={[view, setView]}
      />
    </div>
  );
}