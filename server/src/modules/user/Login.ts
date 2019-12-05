import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import bcrypt from "bcryptjs";
import { MyContext } from "../../ts/context";
import { createTokens } from "../../helpers/auth";
import { Organization } from "../../entity/Organization";

@Resolver()
export class LoginResolver {
  @Mutation(type => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('organizationUrlName') organizationUrlName: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const organization = await Organization.findOne({ where: { urlName: organizationUrlName.trim().toLowerCase() }})
    if (!organization) throw "organization not found by url name";

    const user = await User.findOne({ where: { email, organization } });
    if (!user) throw "email and or password are invalid";

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw "email and or password is invalid";

    const tokens = createTokens(user);

    ctx.res.cookie("refresh-token", tokens.refreshToken);
    ctx.res.cookie("access-token", tokens.accessToken);

    return user;
  }
}