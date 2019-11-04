import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { ObjectType, Field, ID, Float, Int } from "type-graphql";
import { User } from "./User";

@Entity() @ObjectType()
abstract class BaseStoreEntity extends BaseEntity {
  @Field({ nullable: false })
  @Column({ nullable: false })
  name: string

  @Field(type => Float)
  @Column('float')
  cost: number

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description?: string

  @Field({ nullable: true, description: 'Product or Service ID' })
  @Column({ nullable: true, comment: 'Product or Service ID' })
  UPCCode?: string
}

@Entity() @ObjectType()
export class Product extends BaseStoreEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(type => Int)
  @Column('int', { default: 0 })
  inventory: number
}
 
@Entity() @ObjectType()
export class Service extends BaseStoreEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(type => Int, { description: 'duration in minutes' })
  @Column('int', { comment: 'duration in minutes' })
  duration: number

  @Field(type => [User], { defaultValue: [] })
  @ManyToMany(type => User, { eager: true })
  @JoinTable()
  employees: User[]
}