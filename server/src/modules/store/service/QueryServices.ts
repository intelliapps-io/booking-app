import { ObjectType, Resolver, Query, Authorized, InputType, Field, Float, ID, registerEnumType, Arg } from "type-graphql";
import { PaginatedResponse, PaginatedResponseInput } from "../../../helpers/graphqlObjects/PaginatedResponse";
import { Service } from "../../../entity/Store";
import { UserRole } from "../../../entity/User";
import { joinRelation, nodeLogger, queryPaginatedResponse, toSqlArray } from "../../../helpers/helpers";

enum NumberOperator {
  'GREATER' = 'GREATER',
  'LESSER' = 'LESSER',
  'EQUAL' = 'EQUAL'
}

registerEnumType(NumberOperator, { name: 'NumberOperator' })

@ObjectType()
class PaginatedServiesResponse extends PaginatedResponse(Service) { }

@InputType()
class QueryServicesInput extends PaginatedResponseInput {
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
export class QueryServicesResolver {
  @Query(type => PaginatedServiesResponse)
  @Authorized([UserRole['CUSTOMER']])
  services(@Arg('data') data: QueryServicesInput) {
    return new Promise(async (resolve, reject) => {
      const { limit, offset, cost, costOperator, employeeIds, name } = data;
      const query = Service.createQueryBuilder()

      // handle pagination
      query.take(limit ? limit : 20)
      query.skip(offset ? offset : 0)

      // join employees to services
      joinRelation(query, "Service", "employees")

      // filters
      if (name) query.andWhere(`LOWER(Service.name) LIKE LOWER('%${name}%')`)

      if (cost && costOperator) {
        switch (costOperator) {
          case NumberOperator["EQUAL"]:
            query.andWhere(`Service.cost = ${cost}`)
            break;
          case NumberOperator["GREATER"]:
            query.andWhere(`Service.cost >= ${cost}`)
            break;
          case NumberOperator["LESSER"]:
            query.andWhere(`Service.cost <= ${cost}`)
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