import { ObjectType, Resolver, Query, Authorized, InputType, Field, Float, ID, registerEnumType, Arg } from "type-graphql";
import { PaginatedResponse, PaginatedResponseInput } from "../../../helpers/graphqlObjects/PaginatedResponse";
import { Service } from "../../../entity/Store";
import { UserRole } from "../../../entity/User";
import { joinRelation, nodeLogger, queryPaginatedResponse, toSqlArray } from "../../../helpers/helpers";

@Resolver()
export class QueryServiceResolver {
  @Query(type => Service)
  @Authorized([UserRole['CUSTOMER']])
  service(@Arg('id') id: string) {
    return new Promise(async (resolve, reject) => {
      Service.findOne({ where: { id } })
        .then(service => resolve(service))
        .catch(err => err)
    })
  }
}