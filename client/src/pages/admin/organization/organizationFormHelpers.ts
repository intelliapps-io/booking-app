import { HoursOfOperation } from "../../../lib/codegen";
import moment, { Moment } from "moment";


//takes moment values entered in form and turn in back in to number object in database
export function transformHoursOfOperation(values: any): HoursOfOperation {
  const minFromMidnight = (date: Moment): number => moment(date).diff(moment(date).startOf('day'), 'minutes')
  return ({
    monday: {
      start: minFromMidnight(values.monday_start),
      end: minFromMidnight(values.monday_end)
    },
    tuesday: {
      start: minFromMidnight(values.tuesday_start),
      end: minFromMidnight(values.tuesday_end)
    },
    wednesday: {
      start: minFromMidnight(values.wednesday_start),
      end: minFromMidnight(values.wednesday_end)
    },
    thursday: {
      start: minFromMidnight(values.thursday_start),
      end: minFromMidnight(values.thursday_end)
    },
    friday: {
      start: minFromMidnight(values.friday_start),
      end: minFromMidnight(values.friday_end)
    },
    saturday: {
      start: minFromMidnight(values.saturday_start),
      end: minFromMidnight(values.saturday_end)
    },
    sunday: {
      start: minFromMidnight(values.sunday_start),
      end: minFromMidnight(values.sunday_end)
    }
  })

}