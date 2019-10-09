import { InputType, Field, Int, ID } from "type-graphql";


// Fields 
@InputType()
export class EventInput {
  @Field(type => Date)//define type grapghql
  datetime: Date

  @Field(type => Int, { description: 'duration in minutes' })
  duration: number

  @Field(type => ID)
  employeeId: string
}
