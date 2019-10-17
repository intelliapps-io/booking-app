import { ObjectType, Field, ID, Root, registerEnumType, Arg } from 'type-graphql';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

export enum UserRole {
  CUSTOMER = "CUSTOMER",
  EMPLOYEE = "EMPLOYEE",
  ADMIN = "ADMIN"
}

registerEnumType(UserRole, { name: "UserRole", description: "User access role" });

@Entity() @ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  firstName: string

  @Field()
  @Column()
  lastName: string

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field()
  @Column({ unique: true })
  email: string

  @Field(type => UserRole)
  @Column('enum', { default: UserRole["CUSTOMER"], enum: UserRole })
  role: UserRole

  @Field({ nullable: true })
  @Column({ default: 0 })
  authCount: number
  
  @Column()
  password: string
}