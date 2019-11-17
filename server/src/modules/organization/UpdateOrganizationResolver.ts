// import { Resolver, Mutation, Authorized, InputType, Field, Int, ID, Arg, Ctx } from "type-graphql";
// import { Organization } from "../../entity/Organization";
// import { UserRole } from "../../entity/User";
// import { OrganizationInput } from "./OrganizationInput";

// @Resolver()
// export class UpdateOrganizationResolver {
//   @Mutation(type => Organization)
//   @Authorized([UserRole['ADMIN']])
//   createService(@Arg('data') data: OrganizationInput) {
//     return new Promise(async (resolve, reject) => {
//       // const { name, cost, duration, description, UPCCode, employeeIds } = data;
//       // const employees = await User.findByIds(employeeIds, { where: { role: UserRole['EMPLOYEE'] } })
//       //   .catch(err => reject(err))

//       if (typeof employees !== 'object') {
//         reject(new Error('Employees not found'))
//         return
//       }

//       if (cost < 0) {
//         reject(new Error('Cost must be equal to or greater than zero'))
//         return
//       }

//       if (duration < 0) {
//         reject(new Error('Duration must be equal to or greater than zero'))
//         return
//       }

//       // create service
//       Service.create({
//         name,
//         cost,
//         duration,
//         description,
//         UPCCode,
//         employees
//       }).save()
//         .then(result => resolve(result))
//         .catch(err => reject(err))
//     })
//   }
// }