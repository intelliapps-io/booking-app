type RecursOn = [boolean, boolean, boolean, boolean, boolean, boolean, boolean]

export interface CalendarEvent {
  id?: string
  begins: Date
  ends: Date
  // recurrence
  isRecurring: boolean
  recurrenceInterval?: number
  recursOn?: RecursOn
  recurrenceEndsOn?: Date
  excludedDates?: Date[]
}