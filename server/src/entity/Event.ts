import { ObjectType, Field, ID, Root, registerEnumType, Arg, Int } from 'type-graphql';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { User } from './User';
import moment = require('moment');
import { Organization } from './Organization';

@Entity() @ObjectType()
export class Event extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(type => Date)//define type grapghql
  @Column('timestamp with time zone')
  datetime: Date

  @Field(type => String)//taking data from event and diplaying
  date(@Root() event: Event) {
    return moment(event.datetime).format('YYYY-M-D')
  }  

  @Field(type => String)//taking data from event and diplaying
  begins(@Root() event: Event) {
    return moment(event.datetime).format('h:mm A')
  } 

  @Field(type => String)//taking data from event and diplaying
  ends(@Root() event: Event) {
    return moment(event.datetime).add(event.duration, 'minutes').format('h:mm A')
  } 

  @Field(type => Int, { description: 'duration in minutes' })
  @Column('int', { comment: 'duration in minutes' })
  duration: number

  // @Field(type => String) 
  // @Column('string')
  // service: string
    
  @Field(type => User)
  @ManyToOne(type => User, {eager: true})//data type
  customer: User

  @Field(type => User)
  @ManyToOne(type => User, {eager: true})
  employee: User
  
  @Field(type => Organization)
  @ManyToOne(type => Organization, { eager: true })
  organization: Organization
}