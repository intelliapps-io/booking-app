import { Resolver, Query, Authorized, Ctx, ObjectType, InputType, Arg, Field } from "type-graphql";
import { UserRole, User } from "../../entity/User";
import { Event } from "../../entity/Event";
import { MyContext } from "../../ts/context";
import { PaginatedResponse, PaginatedResponseInput } from "../../helpers/graphqlObjects/PaginatedResponse";
import { joinRelation, isFormatYMD, queryPaginatedResponse } from "../../helpers/helpers";

@ObjectType()
class PaginatedEventsResponse extends PaginatedResponse(Event) { }

@InputType()
class QueryEventsInput extends PaginatedResponseInput {
  @Field({ nullable: true, description: 'YYYY-MM-DD format' })
  dateBefore?: string

  @Field({ nullable: true, description: 'YYYY-MM-DD format' })
  dateAfter?: string

  @Field({ nullable: true })
  customerId?: string

  @Field({ nullable: true })
  employeeId?: string

  // TODO: add location filter 
}

@Resolver()
export class QueryEventsResolver {
  @Query(type => PaginatedEventsResponse)
  @Authorized([UserRole['CUSTOMER']])
  queryEvents(@Arg('data') data: QueryEventsInput, @Ctx() ctx: MyContext) {
    return new Promise(async (resolve: (result: PaginatedEventsResponse) => void, reject) => {
      // find user who made the query
      const user = await User.findOne({ where: { id: ctx.req.userId } }).catch(err => reject(err))
      if (!user)
        return reject(new Error('please login'))

      // VALIDATION
      if (data.dateBefore && !isFormatYMD(data.dateBefore))
        return reject(new Error(`${data.dateBefore} is not fomatted as YYYY-MM-DD`))

      if (data.dateAfter && !isFormatYMD(data.dateAfter))
        return reject(new Error(`${data.dateAfter} is not fomatted as YYYY-MM-DD`))

      // find customer from query filter
      const customer = data.customerId ? await User.findOne({ where: { id: data.customerId } }).catch(err => reject(err)) : undefined
      if (data.customerId && !customer)
        return reject(new Error('no customer was found with that id'))

      // find employee from query filter
      const employee = data.employeeId ? await User.findOne({ where: { id: data.employeeId } }).catch(err => reject(err)) : undefined
      if (data.employeeId && !employee)
        return reject(new Error('no employee was found with that id'))

      // QUERY 
      const { limit, offset } = data
      const query = Event.createQueryBuilder()

      // handle pagination
      query.take(limit ? limit : 20)
      query.skip(offset ? offset : 0)

      // join relations
      joinRelation(query, "Event", "customer")
      joinRelation(query, "Event", "employee")
      joinRelation(query, "Event", "organization")

      // Forced role based filters
      if (user.role === UserRole['CUSTOMER'])
        query.andWhere(`"Event"."customerId" = '${user.id}'`)
      else if (user.role === UserRole['EMPLOYEE'])
        query.andWhere(`"Event"."employeeId" = '${user.id}'`)
      else if (user.role === UserRole['ADMIN']) {
        // Admin only filters
        if (customer)
          query.andWhere(`"Event"."customerId" = '${customer.id}'`)

        if (employee)
          query.andWhere(`"Event"."employeeId" = '${employee.id}'`)
      }

      // FILTERS
      if (data.dateBefore)
        query.andWhere(`Event.datetime <= '${data.dateBefore}'`)

      if (data.dateAfter)
        query.andWhere(`Event.datetime >= '${data.dateAfter}'`)

      // get data
      queryPaginatedResponse(query)
        .then(result => resolve(result))
        .catch(err => reject(err))
    })
  }
}