import { ObjectType, Resolver, Query, Authorized, InputType, Field, Float, ID, registerEnumType, Arg } from "type-graphql";
import { PaginatedResponse, PaginatedResponseInput } from "../../../helpers/graphqlObjects/PaginatedResponse";
import { Product } from "../../../entity/Store";
import { UserRole } from "../../../entity/User";
import { joinRelation, nodeLogger, queryPaginatedResponse, toSqlArray } from "../../../helpers/helpers";
import {NumberOperator} from '../service/QueryServices'

@ObjectType()
class PaginatedProductsResponse extends PaginatedResponse(Product) { }

@InputType()
class QueryProductsInput extends PaginatedResponseInput {
  @Field({ nullable: true })
  name?: string

  @Field(type => Float, { nullable: true })
  cost?: number

  @Field(type => NumberOperator, { nullable: true })
  costOperator?: NumberOperator
}

@Resolver()
export class QueryProductsResolver {
  @Query(type => PaginatedProductsResponse)
  //@Authorized([UserRole['CUSTOMER']])//important
  products(@Arg('data') data: QueryProductsInput) {
    return new Promise(async (resolve, reject) => {
      const { limit, offset, cost, costOperator, name } = data;
      const query = Product.createQueryBuilder()

      // handle pagination
      query.take(limit ? limit : 20)
      query.skip(offset ? offset : 0)

      // filters
      if (name) query.andWhere(`LOWER(Product.name) LIKE LOWER('%${name}%')`)

      if (cost && costOperator) {
        switch (costOperator) {
          case NumberOperator["EQUAL"]:
            query.andWhere(`Product.cost = ${cost}`)
            break;
          case NumberOperator["GREATER"]:
            query.andWhere(`Product.cost >= ${cost}`)
            break;
          case NumberOperator["LESSER"]:
            query.andWhere(`Product.cost <= ${cost}`)
            break;
        }
      }

      queryPaginatedResponse(query)
        .then(result => resolve(result))
        .catch(err => reject(err))
    })
  }
}