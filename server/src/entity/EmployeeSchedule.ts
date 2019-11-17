import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm"
import { ObjectType, Field, ID, Int, registerEnumType } from "type-graphql"
import { User } from "./User"

export enum RecurrencePeriod {
  DAY = "DAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
  YEAR = "YEAR"
}

/**
 * @type boolean corresponds to day of the week [mon, tue, wed, thr, fri, sat, sun]
 */
export type RecursOn = [boolean, boolean, boolean, boolean, boolean, boolean, boolean]

registerEnumType(RecurrencePeriod, { name: "RecurrencePeriod", description: "Interval for repeating schedule" });
 
@Entity() @ObjectType()
export class EmployeeSchedule extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  // Schedule starts / ends 
  @Field(type => Date)
  @Column('timestamp with time zone')
  begins: Date

  @Field(type => Date)
  @Column('timestamp with time zone')
  ends: Date
  
  // Schedule recurrence
  @Field(type => Boolean)
  @Column('boolean', { default: false })
  isRecurring: boolean
  
  @Field(type => RecurrencePeriod, { nullable: true })
  @Column('enum', { enum: RecurrencePeriod, nullable: true })
  recurrencePeriod?: RecurrencePeriod

  @Field(type => Int, { nullable: true })
  @Column('int', { nullable: true })
  recurrenceInterval?: number

  @Field(type => [Boolean], { nullable: true })
  @Column('boolean', { nullable: true, array: true })
  recursOn?: RecursOn

  @Field(type => Date, { nullable: true })
  @Column('timestamp with time zone', { nullable: true })
  recurrenceEndsOn?: Date

  // Employee Relation
  @Field(type => User)
  @ManyToOne(type => User, { eager: true })
  employee: User
}