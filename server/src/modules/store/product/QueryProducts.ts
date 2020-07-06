import { ObjectType, Resolver, Query, Authorized, InputType, Field, Float, ID, registerEnumType, Arg } from "type-graphql";
import { PaginatedResponse, PaginatedResponseInput } from "../../../helpers/graphqlObjects/PaginatedResponse";
import { Product } from "../../../entity/Store";
import { UserRole } from "../../../entity/User";
import { joinRelation, nodeLogger, queryPaginatedResponse, toSqlArray } from "../../../helpers/helpers";

enum NumberOperator {
  'GREATER' = 'GREATER',
  'LESSER' = 'LESSER',
  'EQUAL' = 'EQUAL'
}

registerEnumType(NumberOperator, { name: 'NumberOperator' })

@ObjectType()
class PaginatedServiesResponse extends PaginatedResponse(Product) { }

@InputType()
class QueryProductsInput extends PaginatedResponseInput {
  @Field({ nullable: true })
  name?: string

  @Field(type => Float, { nullable: true })
  cost?: number

  @Field(type => NumberOperator, { nullable: true })
  costOperator?: NumberOperator

  @Field(type => [ID], { nullable: true })
  employeeIds?: string[]
}

@Resolver()
export class QueryProductsResolver {
  @Query(type => PaginatedServiesResponse)
  //@Authorized([UserRole['CUSTOMER']])//important
  services(@Arg('data') data: QueryProductsInput) {
    return new Promise(async (resolve, reject) => {
      const { limit, offset, cost, costOperator, employeeIds, name } = data;
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

      if (employeeIds) {
        query.andWhere(`"employees"."id" IN (${toSqlArray(employeeIds)})`)
      }

      queryPaginatedResponse(query)
        .then(result => resolve(result))
        .catch(err => reject(err))
    })
  }
}