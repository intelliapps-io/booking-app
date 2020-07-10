import { ObjectType, Resolver, Query, Authorized, InputType, Field, Float, ID, registerEnumType, Arg } from "type-graphql";
import { PaginatedResponse, PaginatedResponseInput } from "../../../helpers/graphqlObjects/PaginatedResponse";
import { Product } from "../../../entity/Store";
import { UserRole } from "../../../entity/User";
import { joinRelation, nodeLogger, queryPaginatedResponse, toSqlArray } from "../../../helpers/helpers";

@Resolver()
export class QueryProductResolver {
  @Query(type => Product)
  @Authorized([UserRole['CUSTOMER']])
  product(@Arg('id') id: string) {
    return new Promise(async (resolve, reject) => {
      Product.findOne({ where: { id } })
        .then(service => resolve(service))
        .catch(err => err)
    })
  }
}