import { InputType, Field, Float, Int, ID } from "type-graphql";

@InputType()
abstract class BaseStoreEntityInput {
  @Field()
  name: string

  @Field(type => Float)
  cost: number

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true, description: 'Product or Service ID' })
  UPCCode?: string
}

@InputType()
export class ProductInput extends BaseStoreEntityInput {
  @Field(type => Int)
  inventory: number
}

@InputType()
export class ServiceInput extends BaseStoreEntityInput {
  @Field(type => Int, { description: 'duration in minutes' })
  duration: number

  @Field(type => [ID], { nullable: true })
  employeeIds: string[]
}