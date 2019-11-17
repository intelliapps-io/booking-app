import { InputType, Field, Int } from "type-graphql";
import { HoursOfOperation } from "../../entity/Organization";

@InputType()
export class OrganizationInput {
  @Field(type => String)
  urlName: string

  @Field(type => String)
  name: string

  @Field(type => String)
  phone: string

  @Field(type => String)
  address: string

  @Field(type => String)
  contactEmail: string

  @Field(type => HoursOfOperationInput)
  hoursOfOperation: HoursOfOperationInput

  @Field(type => String)
  landingHtml: string
}

@InputType()
class TimeframeInput {
  @Field(type => Int, { description: 'Minutes since beginning of day'})
  start: number

  @Field(type => Int, { description: 'Minutes since beginning of day'})
  end: number
}

@InputType()
export class HoursOfOperationInput {
  @Field(type => TimeframeInput)
  monday: TimeframeInput

  @Field(type => TimeframeInput)
  tuesday: TimeframeInput

  @Field(type => TimeframeInput)
  wednesday: TimeframeInput

  @Field(type => TimeframeInput)
  thursday: TimeframeInput

  @Field(type => TimeframeInput)
  friday: TimeframeInput

  @Field(type => TimeframeInput)
  saturday: TimeframeInput

  @Field(type => TimeframeInput)
  sunday: TimeframeInput
}