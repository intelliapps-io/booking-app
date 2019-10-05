import { ObjectType, Field, ID, Root, registerEnumType, Arg, Int } from 'type-graphql';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { User } from './User';




@Entity() @ObjectType()
export class Event extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(type => Date)//define type grapghql
  @Column('date')
  date: Date

  @Field(type => String)
  @Column('timestamp with time zone')
  time: string

  @Field(type => Int, { description: 'duration in minutes' })
  @Column('int')
  duration: number
    
  @Field(type => User)
  @ManyToOne(type => User)//data type
  customer: User

  @Field(type => User)
  @ManyToOne(type => User)
  employee: User
  
  //add comment field 
  // no admin 
  



}