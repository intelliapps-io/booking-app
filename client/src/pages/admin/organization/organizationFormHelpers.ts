import { HoursOfOperation } from "../../../lib/codegen";

export function transformHoursOfOperation(hoursOfOperation: HoursOfOperation): HoursOfOperation {
  Object.entries(hoursOfOperation).forEach(([key, timeframe]) => {
    if (key === '__typename') 
      // @ts-ignore
      hoursOfOperation['__typename'] = undefined
     else 
      //@ts-ignore
      hoursOfOperation[key] = {
        start: timeframe.start,
        end: timeframe.end
      }
  })
  return hoursOfOperation
}