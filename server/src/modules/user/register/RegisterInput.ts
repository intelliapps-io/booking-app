import { Length, IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";
import { UserRole } from "../../../entity/User";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;
  
  @Field()
  @IsEmail()
  email: string;
  
  @Field()
  @Length(1, 255)
  password: string;

  @Field({ nullable: true })
  organizationUrl?: string

  @Field({ nullable: true })
  organizationId?: string

  @Field({ nullable: true })
  role?: UserRole
}
