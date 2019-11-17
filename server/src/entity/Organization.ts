import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm"
import { ObjectType, Field, ID, Int } from "type-graphql"

@ObjectType() 
class Timeframe {
  @Field(type => Int, { description: 'Minutes since beginning of day'})
  start: number

  @Field(type => Int, { description: 'Minutes since beginning of day'})
  end: number
}

@ObjectType()
export class HoursOfOperation {
  @Field(type => Timeframe)
  monday: Timeframe

  @Field(type => Timeframe)
  tuesday: Timeframe

  @Field(type => Timeframe)
  wednesday: Timeframe

  @Field(type => Timeframe)
  thursday: Timeframe

  @Field(type => Timeframe)
  friday: Timeframe

  @Field(type => Timeframe)
  saturday: Timeframe

  @Field(type => Timeframe)
  sunday: Timeframe
}

@Entity() @ObjectType()
export class Organization extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(type => String)
  @Column('text')
  name: string

  @Field(type => String)
  @Column('text')
  phone: string

  @Field(type => String)
  @Column('text')
  address: string

  @Field(type => String)
  @Column('text')
  contactEmail: string

  @Field(type => HoursOfOperation)
  @Column('json')
  hoursOfOperation: HoursOfOperation

  @Field(type => String)
  @Column('text')
  landingHtml: string
}

export function validateHoursOfOperation(hoo: HoursOfOperation): boolean {
  const validateTimeframe = ({ start, end }: Timeframe) => (start < 0 || end < 0 || start >= 1439 || end > 1439)
  return (
    validateTimeframe(hoo.monday) &&
    validateTimeframe(hoo.tuesday) &&
    validateTimeframe(hoo.wednesday) &&
    validateTimeframe(hoo.thursday) &&
    validateTimeframe(hoo.friday) &&
    validateTimeframe(hoo.saturday) &&
    validateTimeframe(hoo.sunday)
  )
}