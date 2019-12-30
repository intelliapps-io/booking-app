type RecursOn = [boolean, boolean, boolean, boolean, boolean, boolean, boolean]

export interface SchedularEvent {
  id?: string
  begins: Date
  ends: Date
  // recurrence
  isRecurring: boolean
  recurrenceInterval?: number
  recursOn?: RecursOn
  recurrenceEndsOn?: Date
}