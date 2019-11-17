import { InputType, Field } from "type-graphql";
import { HoursOfOperation } from "../../entity/Organization";

@InputType()
export class OrganizationInput {
  @Field(type => String)
  name: string

  @Field(type => String)
  phone: string

  @Field(type => String)
  address: string

  @Field(type => String)
  contactEmail: string

  @Field(type => HoursOfOperation)
  hoursOfOperation: HoursOfOperation

  @Field(type => String)
  landingHtml: string
}