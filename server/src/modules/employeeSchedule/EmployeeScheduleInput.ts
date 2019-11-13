import { InputType, Field, Int, ID } from "type-graphql";
import { RecurrencePeriod, RecursOn } from "../../entity/EmployeeSchedule";
import moment = require("moment");

@InputType()
export class EmployeeScheduleInput {
  // Schedule starts / ends 
  @Field(type => Date)
  begins: Date

  @Field(type => Date)
  ends: Date

  // Schedule recurrence
  @Field(type => Boolean)
  isRecurring: boolean

  @Field(type => RecurrencePeriod, { nullable: true })
  recurrencePeriod?: RecurrencePeriod

  @Field(type => Int, { nullable: true })
  recurrenceInterval?: number

  @Field(type => [Boolean], { nullable: true })
  recursOn?: RecursOn

  @Field(type => Date, { nullable: true })
  recurrenceEndsOn?: Date

  // Admin Set Employee
  @Field(type => ID, { nullable: true })
  employeeId?: string
}

// Input Validation
export function validateEmployeeSchedule(data: EmployeeScheduleInput) {
  return new Promise(async (resolve: (isValid: true) => void, reject: (err: Error) => void) => {
    // does schedule end after it begins
    if (moment(data.begins).isAfter(moment(data.ends)))
      return reject(new Error('Schedule cannot begin after it ends'))
    
    if (data.isRecurring) {
      // check recurrence period
      if (!data.recurrencePeriod)
        return reject(new Error('Recurrence period is required'))

      // check recurrence interval
      if (data.recurrenceInterval && data.recurrenceInterval <= 0) 
        return reject(new Error('Recurrence interval must be greater than 0'))
      
      // check recurs on
      if (!data.recursOn)
        return reject(new Error('recursOn is required for recurring schedule'))
      const recursOnIsValid = await isRecursOnValid(data.recursOn).catch(err => reject(err))
      if (!recursOnIsValid)
        return reject(new Error('recursOn array is invalid'))
      
      if (data.recurrenceEndsOn && moment(data.recurrenceEndsOn).isBefore(moment(data.ends))) 
        return reject(new Error('recurrenceEndsOn must be after the first schedule ends'))
    }

    resolve(true)
  })
}

const isRecursOnValid = (recursOn: boolean[]): Promise<boolean> =>
  new Promise((resolve: (isValid: true) => void, reject: (err: Error) => void) => {
    if (recursOn.length !== 7) {
      reject(new Error('recursOn must be of length 7'))
      return
    } 
    let isValid = true
    recursOn.forEach(item => {
      if (typeof item !== 'boolean')
        isValid = false
    })
    if (isValid)
      resolve(true)
    else 
      reject(new Error('each element in recursOn must be a boolean'))
  })