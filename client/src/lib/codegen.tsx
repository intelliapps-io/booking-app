import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};

export type BaseStoreEntity = {
  name: Scalars['String'],
  cost: Scalars['Float'],
  description?: Maybe<Scalars['String']>,
  /** Product or Service ID */
  UPCCode?: Maybe<Scalars['String']>,
  organization: Organization,
};

export type BaseStoreEntityInput = {
  name: Scalars['String'],
  cost: Scalars['Float'],
  description?: Maybe<Scalars['String']>,
  /** Product or Service ID */
  UPCCode?: Maybe<Scalars['String']>,
};


export type EmployeeSchedule = {
  id: Scalars['ID'],
  begins: Scalars['DateTime'],
  ends: Scalars['DateTime'],
  isRecurring: Scalars['Boolean'],
  recurrenceInterval?: Maybe<Scalars['Int']>,
  recursOn?: Maybe<Array<Scalars['Boolean']>>,
  recurrenceEndsOn?: Maybe<Scalars['DateTime']>,
  excludedDates?: Maybe<Array<Scalars['DateTime']>>,
  employee: User,
};

export type EmployeeScheduleInput = {
  begins: Scalars['DateTime'],
  ends: Scalars['DateTime'],
  isRecurring: Scalars['Boolean'],
  recurrenceInterval?: Maybe<Scalars['Int']>,
  recursOn?: Maybe<Array<Scalars['Boolean']>>,
  recurrenceEndsOn?: Maybe<Scalars['DateTime']>,
  excludedDates?: Maybe<Array<Scalars['DateTime']>>,
  employeeId?: Maybe<Scalars['ID']>,
};

export type Event = {
  id: Scalars['ID'],
  datetime: Scalars['DateTime'],
  date: Scalars['String'],
  begins: Scalars['String'],
  ends: Scalars['String'],
  /** duration in minutes */
  duration: Scalars['Int'],
  customer: User,
  employee: User,
  organization: Organization,
};

export type EventInput = {
  datetime: Scalars['DateTime'],
  /** duration in minutes */
  duration: Scalars['Int'],
  employeeId: Scalars['ID'],
};

export type HoursOfOperation = {
  monday: Timeframe,
  tuesday: Timeframe,
  wednesday: Timeframe,
  thursday: Timeframe,
  friday: Timeframe,
  saturday: Timeframe,
  sunday: Timeframe,
};

export type HoursOfOperationInput = {
  monday: TimeframeInput,
  tuesday: TimeframeInput,
  wednesday: TimeframeInput,
  thursday: TimeframeInput,
  friday: TimeframeInput,
  saturday: TimeframeInput,
  sunday: TimeframeInput,
};

export type Mutation = {
  login?: Maybe<User>,
  logout?: Maybe<Scalars['String']>,
  register: Scalars['String'],
  createUser: User,
  updateUser: User,
  createEvent: Event,
  deleteEvent: Scalars['Boolean'],
  createService: Service,
  updateService: Service,
  deleteService: Scalars['ID'],
  createEmployeeSchedule: EmployeeSchedule,
  updateEmployeeSchedule: EmployeeSchedule,
  deleteEmployeeSchedule: Scalars['String'],
  employeeSchedule: EmployeeSchedule,
  employeeSchedules: Array<EmployeeSchedule>,
  updateOrganization: Organization,
  deleteUser: User,
};


export type MutationLoginArgs = {
  organizationUrlName: Scalars['String'],
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationRegisterArgs = {
  data: RegisterInput
};


export type MutationCreateUserArgs = {
  data: RegisterInput
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput
};


export type MutationCreateEventArgs = {
  data: EventInput
};


export type MutationDeleteEventArgs = {
  id: Scalars['String']
};


export type MutationCreateServiceArgs = {
  data: ServiceInput
};


export type MutationUpdateServiceArgs = {
  data: ServiceInput,
  id: Scalars['String']
};


export type MutationDeleteServiceArgs = {
  id: Scalars['String']
};


export type MutationCreateEmployeeScheduleArgs = {
  data: EmployeeScheduleInput
};


export type MutationUpdateEmployeeScheduleArgs = {
  data: EmployeeScheduleInput,
  id: Scalars['String']
};


export type MutationDeleteEmployeeScheduleArgs = {
  id: Scalars['String']
};


export type MutationEmployeeScheduleArgs = {
  id: Scalars['String']
};


export type MutationEmployeeSchedulesArgs = {
  data?: Maybe<QueryEmployeeSchedulesInput>
};


export type MutationUpdateOrganizationArgs = {
  data: OrganizationInput,
  id: Scalars['String']
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']
};

export enum NumberOperator {
  Greater = 'GREATER',
  Lesser = 'LESSER',
  Equal = 'EQUAL'
}

export type Organization = {
  id: Scalars['ID'],
  urlName: Scalars['String'],
  name: Scalars['String'],
  phone: Scalars['String'],
  address: Scalars['String'],
  contactEmail: Scalars['String'],
  hoursOfOperation: HoursOfOperation,
  landingHtml: Scalars['String'],
};

export type OrganizationInput = {
  urlName: Scalars['String'],
  name: Scalars['String'],
  phone: Scalars['String'],
  address: Scalars['String'],
  contactEmail: Scalars['String'],
  hoursOfOperation: HoursOfOperationInput,
  landingHtml: Scalars['String'],
};

export type PaginatedEventsResponse = {
  items: Array<Event>,
  total: Scalars['Int'],
};

export type PaginatedResponseInput = {
  offset?: Maybe<Scalars['Float']>,
  limit?: Maybe<Scalars['Float']>,
};

export type PaginatedServiesResponse = {
  items: Array<Service>,
  total: Scalars['Int'],
};

export type PaginatedUsersResponse = {
  items: Array<User>,
  total: Scalars['Int'],
};

export type Product = {
  name: Scalars['String'],
  cost: Scalars['Float'],
  description?: Maybe<Scalars['String']>,
  /** Product or Service ID */
  UPCCode?: Maybe<Scalars['String']>,
  organization: Organization,
  id: Scalars['ID'],
  inventory: Scalars['Int'],
};

export type ProductInput = {
  name: Scalars['String'],
  cost: Scalars['Float'],
  description?: Maybe<Scalars['String']>,
  /** Product or Service ID */
  UPCCode?: Maybe<Scalars['String']>,
  inventory: Scalars['Int'],
};

export type Query = {
  me?: Maybe<User>,
  users: PaginatedUsersResponse,
  user: User,
  queryEvents: PaginatedEventsResponse,
  queryEvent: Event,
  services: PaginatedServiesResponse,
  service: Service,
  organization: Organization,
};


export type QueryUsersArgs = {
  data: QueryUsersInput
};


export type QueryUserArgs = {
  id: Scalars['String']
};


export type QueryQueryEventsArgs = {
  data: QueryEventsInput
};


export type QueryQueryEventArgs = {
  id: Scalars['String']
};


export type QueryServicesArgs = {
  data: QueryServicesInput
};


export type QueryServiceArgs = {
  id: Scalars['String']
};


export type QueryOrganizationArgs = {
  data: QueryOrganizationInput
};

export type QueryEmployeeSchedulesInput = {
  before?: Maybe<Scalars['DateTime']>,
  after?: Maybe<Scalars['DateTime']>,
  employeeId?: Maybe<Scalars['ID']>,
};

export type QueryEventsInput = {
  offset?: Maybe<Scalars['Float']>,
  limit?: Maybe<Scalars['Float']>,
};

export type QueryOrganizationInput = {
  id?: Maybe<Scalars['String']>,
  urlName?: Maybe<Scalars['String']>,
};

export type QueryServicesInput = {
  offset?: Maybe<Scalars['Float']>,
  limit?: Maybe<Scalars['Float']>,
  name?: Maybe<Scalars['String']>,
  cost?: Maybe<Scalars['Float']>,
  costOperator?: Maybe<NumberOperator>,
  employeeIds?: Maybe<Array<Scalars['ID']>>,
};

export type QueryUsersInput = {
  offset?: Maybe<Scalars['Float']>,
  limit?: Maybe<Scalars['Float']>,
  role?: Maybe<Scalars['String']>,
};

export type RegisterInput = {
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
  organizationUrl?: Maybe<Scalars['String']>,
  organizationId?: Maybe<Scalars['String']>,
  role?: Maybe<Scalars['String']>,
};

export type Service = {
  name: Scalars['String'],
  cost: Scalars['Float'],
  description?: Maybe<Scalars['String']>,
  /** Product or Service ID */
  UPCCode?: Maybe<Scalars['String']>,
  organization: Organization,
  id: Scalars['ID'],
  /** duration in minutes */
  duration: Scalars['Int'],
  employees?: Maybe<Array<User>>,
};

export type ServiceInput = {
  name: Scalars['String'],
  cost: Scalars['Float'],
  description?: Maybe<Scalars['String']>,
  /** Product or Service ID */
  UPCCode?: Maybe<Scalars['String']>,
  /** duration in minutes */
  duration: Scalars['Int'],
  employeeIds: Array<Scalars['ID']>,
};

export type Timeframe = {
  /** Minutes since beginning of day */
  start: Scalars['Int'],
  /** Minutes since beginning of day */
  end: Scalars['Int'],
};

export type TimeframeInput = {
  /** Minutes since beginning of day */
  start: Scalars['Int'],
  /** Minutes since beginning of day */
  end: Scalars['Int'],
};

export type UpdateUserInput = {
  userId?: Maybe<Scalars['String']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  role?: Maybe<Scalars['String']>,
};

export type User = {
  id: Scalars['ID'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  name: Scalars['String'],
  email: Scalars['String'],
  role: UserRole,
  authCount?: Maybe<Scalars['Float']>,
  emailConfirmed?: Maybe<Scalars['Boolean']>,
  organization?: Maybe<Organization>,
};

/** User access role */
export enum UserRole {
  Customer = 'CUSTOMER',
  Employee = 'EMPLOYEE',
  Admin = 'ADMIN'
}

export type EmployeeScheduleFragment = (
  Pick<EmployeeSchedule, 'id' | 'begins' | 'ends' | 'isRecurring' | 'recurrenceInterval' | 'recursOn' | 'recurrenceEndsOn' | 'excludedDates'>
  & { employee: UserFragment }
);

export type CreateEmployeeScheduleMutationVariables = {
  data: EmployeeScheduleInput
};


export type CreateEmployeeScheduleMutation = { createEmployeeSchedule: EmployeeScheduleFragment };

export type UpdateEmployeeScheduleMutationVariables = {
  id: Scalars['String'],
  data: EmployeeScheduleInput
};


export type UpdateEmployeeScheduleMutation = { updateEmployeeSchedule: EmployeeScheduleFragment };

export type DeleteEmployeeScheduleMutationVariables = {
  id: Scalars['String']
};


export type DeleteEmployeeScheduleMutation = Pick<Mutation, 'deleteEmployeeSchedule'>;

export type EmployeeScheduleMutationVariables = {
  id: Scalars['String']
};


export type EmployeeScheduleMutation = { employeeSchedule: EmployeeScheduleFragment };

export type CreateEventMutationVariables = {
  data: EventInput
};


export type CreateEventMutation = { createEvent: EventFragment };

export type DeleteEventMutationVariables = {
  id: Scalars['String']
};


export type DeleteEventMutation = Pick<Mutation, 'deleteEvent'>;

export type EventsQueryVariables = {
  data: QueryEventsInput
};


export type EventsQuery = { queryEvents: (
    Pick<PaginatedEventsResponse, 'total'>
    & { items: Array<EventFragment> }
  ) };

export type EventQueryVariables = {
  id: Scalars['String']
};


export type EventQuery = { queryEvent: EventFragment };

export type EventFragment = (
  Pick<Event, 'id' | 'datetime' | 'begins' | 'ends' | 'duration'>
  & { customer: UserFragment, employee: UserFragment }
);

export type OrganizationFragment = (
  Pick<Organization, 'id' | 'urlName' | 'name' | 'phone' | 'address' | 'contactEmail' | 'landingHtml'>
  & { hoursOfOperation: { monday: Pick<Timeframe, 'start' | 'end'>, tuesday: Pick<Timeframe, 'start' | 'end'>, wednesday: Pick<Timeframe, 'start' | 'end'>, thursday: Pick<Timeframe, 'start' | 'end'>, friday: Pick<Timeframe, 'start' | 'end'>, saturday: Pick<Timeframe, 'start' | 'end'>, sunday: Pick<Timeframe, 'start' | 'end'> } }
);

export type OrganizationQueryVariables = {
  data: QueryOrganizationInput
};


export type OrganizationQuery = { organization: OrganizationFragment };

export type UpdateOrganizationMutationVariables = {
  id: Scalars['String'],
  data: OrganizationInput
};


export type UpdateOrganizationMutation = { updateOrganization: OrganizationFragment };

export type ServiceFragment = (
  Pick<Service, 'id' | 'name' | 'cost' | 'description' | 'UPCCode'>
  & { employees: Maybe<Array<UserFragment>> }
);

export type CreateServiceMutationVariables = {
  data: ServiceInput
};


export type CreateServiceMutation = { createService: ServiceFragment };

export type UpdateServiceMutationVariables = {
  id: Scalars['String'],
  data: ServiceInput
};


export type UpdateServiceMutation = { updateService: ServiceFragment };

export type DeleteServiceMutationVariables = {
  id: Scalars['String']
};


export type DeleteServiceMutation = Pick<Mutation, 'deleteService'>;

export type ServicesQueryVariables = {
  data: QueryServicesInput
};


export type ServicesQuery = { services: (
    Pick<PaginatedServiesResponse, 'total'>
    & { items: Array<ServiceFragment> }
  ) };

export type ServiceQueryVariables = {
  id: Scalars['String']
};


export type ServiceQuery = { service: ServiceFragment };

export type UserFragment = (
  Pick<User, 'id' | 'firstName' | 'lastName' | 'name' | 'email' | 'role'>
  & { organization: Maybe<Pick<Organization, 'id' | 'urlName' | 'name'>> }
);

export type RegisterMutationVariables = {
  data: RegisterInput
};


export type RegisterMutation = Pick<Mutation, 'register'>;

export type CreateUserMutationVariables = {
  data: RegisterInput
};


export type CreateUserMutation = { createUser: UserFragment };

export type UpdateUserMutationVariables = {
  data: UpdateUserInput
};


export type UpdateUserMutation = { updateUser: UserFragment };

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String'],
  organizationUrlName: Scalars['String']
};


export type LoginMutation = { login: Maybe<UserFragment> };

export type LogoutMutationVariables = {};


export type LogoutMutation = Pick<Mutation, 'logout'>;

export type MeQueryVariables = {};


export type MeQuery = { me: Maybe<UserFragment> };

export type UsersQueryVariables = {
  data: QueryUsersInput
};


export type UsersQuery = { users: (
    Pick<PaginatedUsersResponse, 'total'>
    & { items: Array<UserFragment> }
  ) };

export type UserQueryVariables = {
  id: Scalars['String']
};


export type UserQuery = { user: UserFragment };

export type DeleteUserMutationVariables = {
  id: Scalars['String']
};


export type DeleteUserMutation = { deleteUser: UserFragment };

export const UserFragmentDoc = gql`
    fragment User on User {
  id
  firstName
  lastName
  name
  email
  role
  organization {
    id
    urlName
    name
  }
}
    `;
export const EmployeeScheduleFragmentDoc = gql`
    fragment EmployeeSchedule on EmployeeSchedule {
  id
  begins
  ends
  isRecurring
  recurrenceInterval
  recursOn
  recurrenceEndsOn
  excludedDates
  employee {
    ...User
  }
}
    ${UserFragmentDoc}`;
export const EventFragmentDoc = gql`
    fragment Event on Event {
  id
  datetime
  begins
  ends
  duration
  customer {
    ...User
  }
  employee {
    ...User
  }
}
    ${UserFragmentDoc}`;
export const OrganizationFragmentDoc = gql`
    fragment Organization on Organization {
  id
  urlName
  name
  phone
  address
  contactEmail
  landingHtml
  hoursOfOperation {
    monday {
      start
      end
    }
    tuesday {
      start
      end
    }
    wednesday {
      start
      end
    }
    thursday {
      start
      end
    }
    friday {
      start
      end
    }
    saturday {
      start
      end
    }
    sunday {
      start
      end
    }
  }
}
    `;
export const ServiceFragmentDoc = gql`
    fragment Service on Service {
  id
  name
  cost
  description
  UPCCode
  employees {
    ...User
  }
}
    ${UserFragmentDoc}`;
export const CreateEmployeeScheduleDocument = gql`
    mutation CreateEmployeeSchedule($data: EmployeeScheduleInput!) {
  createEmployeeSchedule(data: $data) {
    ...EmployeeSchedule
  }
}
    ${EmployeeScheduleFragmentDoc}`;
export type CreateEmployeeScheduleMutationFn = ApolloReactCommon.MutationFunction<CreateEmployeeScheduleMutation, CreateEmployeeScheduleMutationVariables>;
export type CreateEmployeeScheduleComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateEmployeeScheduleMutation, CreateEmployeeScheduleMutationVariables>, 'mutation'>;

    export const CreateEmployeeScheduleComponent = (props: CreateEmployeeScheduleComponentProps) => (
      <ApolloReactComponents.Mutation<CreateEmployeeScheduleMutation, CreateEmployeeScheduleMutationVariables> mutation={CreateEmployeeScheduleDocument} {...props} />
    );
    
export type CreateEmployeeScheduleProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateEmployeeScheduleMutation, CreateEmployeeScheduleMutationVariables> & TChildProps;
export function withCreateEmployeeSchedule<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateEmployeeScheduleMutation,
  CreateEmployeeScheduleMutationVariables,
  CreateEmployeeScheduleProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateEmployeeScheduleMutation, CreateEmployeeScheduleMutationVariables, CreateEmployeeScheduleProps<TChildProps>>(CreateEmployeeScheduleDocument, {
      alias: 'createEmployeeSchedule',
      ...operationOptions
    });
};

/**
 * __useCreateEmployeeScheduleMutation__
 *
 * To run a mutation, you first call `useCreateEmployeeScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEmployeeScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEmployeeScheduleMutation, { data, loading, error }] = useCreateEmployeeScheduleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateEmployeeScheduleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateEmployeeScheduleMutation, CreateEmployeeScheduleMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateEmployeeScheduleMutation, CreateEmployeeScheduleMutationVariables>(CreateEmployeeScheduleDocument, baseOptions);
      }
export type CreateEmployeeScheduleMutationHookResult = ReturnType<typeof useCreateEmployeeScheduleMutation>;
export type CreateEmployeeScheduleMutationResult = ApolloReactCommon.MutationResult<CreateEmployeeScheduleMutation>;
export type CreateEmployeeScheduleMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateEmployeeScheduleMutation, CreateEmployeeScheduleMutationVariables>;
export const UpdateEmployeeScheduleDocument = gql`
    mutation UpdateEmployeeSchedule($id: String!, $data: EmployeeScheduleInput!) {
  updateEmployeeSchedule(id: $id, data: $data) {
    ...EmployeeSchedule
  }
}
    ${EmployeeScheduleFragmentDoc}`;
export type UpdateEmployeeScheduleMutationFn = ApolloReactCommon.MutationFunction<UpdateEmployeeScheduleMutation, UpdateEmployeeScheduleMutationVariables>;
export type UpdateEmployeeScheduleComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateEmployeeScheduleMutation, UpdateEmployeeScheduleMutationVariables>, 'mutation'>;

    export const UpdateEmployeeScheduleComponent = (props: UpdateEmployeeScheduleComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateEmployeeScheduleMutation, UpdateEmployeeScheduleMutationVariables> mutation={UpdateEmployeeScheduleDocument} {...props} />
    );
    
export type UpdateEmployeeScheduleProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateEmployeeScheduleMutation, UpdateEmployeeScheduleMutationVariables> & TChildProps;
export function withUpdateEmployeeSchedule<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateEmployeeScheduleMutation,
  UpdateEmployeeScheduleMutationVariables,
  UpdateEmployeeScheduleProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateEmployeeScheduleMutation, UpdateEmployeeScheduleMutationVariables, UpdateEmployeeScheduleProps<TChildProps>>(UpdateEmployeeScheduleDocument, {
      alias: 'updateEmployeeSchedule',
      ...operationOptions
    });
};

/**
 * __useUpdateEmployeeScheduleMutation__
 *
 * To run a mutation, you first call `useUpdateEmployeeScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmployeeScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmployeeScheduleMutation, { data, loading, error }] = useUpdateEmployeeScheduleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateEmployeeScheduleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateEmployeeScheduleMutation, UpdateEmployeeScheduleMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateEmployeeScheduleMutation, UpdateEmployeeScheduleMutationVariables>(UpdateEmployeeScheduleDocument, baseOptions);
      }
export type UpdateEmployeeScheduleMutationHookResult = ReturnType<typeof useUpdateEmployeeScheduleMutation>;
export type UpdateEmployeeScheduleMutationResult = ApolloReactCommon.MutationResult<UpdateEmployeeScheduleMutation>;
export type UpdateEmployeeScheduleMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateEmployeeScheduleMutation, UpdateEmployeeScheduleMutationVariables>;
export const DeleteEmployeeScheduleDocument = gql`
    mutation DeleteEmployeeSchedule($id: String!) {
  deleteEmployeeSchedule(id: $id)
}
    `;
export type DeleteEmployeeScheduleMutationFn = ApolloReactCommon.MutationFunction<DeleteEmployeeScheduleMutation, DeleteEmployeeScheduleMutationVariables>;
export type DeleteEmployeeScheduleComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteEmployeeScheduleMutation, DeleteEmployeeScheduleMutationVariables>, 'mutation'>;

    export const DeleteEmployeeScheduleComponent = (props: DeleteEmployeeScheduleComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteEmployeeScheduleMutation, DeleteEmployeeScheduleMutationVariables> mutation={DeleteEmployeeScheduleDocument} {...props} />
    );
    
export type DeleteEmployeeScheduleProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteEmployeeScheduleMutation, DeleteEmployeeScheduleMutationVariables> & TChildProps;
export function withDeleteEmployeeSchedule<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteEmployeeScheduleMutation,
  DeleteEmployeeScheduleMutationVariables,
  DeleteEmployeeScheduleProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteEmployeeScheduleMutation, DeleteEmployeeScheduleMutationVariables, DeleteEmployeeScheduleProps<TChildProps>>(DeleteEmployeeScheduleDocument, {
      alias: 'deleteEmployeeSchedule',
      ...operationOptions
    });
};

/**
 * __useDeleteEmployeeScheduleMutation__
 *
 * To run a mutation, you first call `useDeleteEmployeeScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEmployeeScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEmployeeScheduleMutation, { data, loading, error }] = useDeleteEmployeeScheduleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEmployeeScheduleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteEmployeeScheduleMutation, DeleteEmployeeScheduleMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteEmployeeScheduleMutation, DeleteEmployeeScheduleMutationVariables>(DeleteEmployeeScheduleDocument, baseOptions);
      }
export type DeleteEmployeeScheduleMutationHookResult = ReturnType<typeof useDeleteEmployeeScheduleMutation>;
export type DeleteEmployeeScheduleMutationResult = ApolloReactCommon.MutationResult<DeleteEmployeeScheduleMutation>;
export type DeleteEmployeeScheduleMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteEmployeeScheduleMutation, DeleteEmployeeScheduleMutationVariables>;
export const EmployeeScheduleDocument = gql`
    mutation EmployeeSchedule($id: String!) {
  employeeSchedule(id: $id) {
    ...EmployeeSchedule
  }
}
    ${EmployeeScheduleFragmentDoc}`;
export type EmployeeScheduleMutationFn = ApolloReactCommon.MutationFunction<EmployeeScheduleMutation, EmployeeScheduleMutationVariables>;
export type EmployeeScheduleComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<EmployeeScheduleMutation, EmployeeScheduleMutationVariables>, 'mutation'>;

    export const EmployeeScheduleComponent = (props: EmployeeScheduleComponentProps) => (
      <ApolloReactComponents.Mutation<EmployeeScheduleMutation, EmployeeScheduleMutationVariables> mutation={EmployeeScheduleDocument} {...props} />
    );
    
export type EmployeeScheduleProps<TChildProps = {}> = ApolloReactHoc.MutateProps<EmployeeScheduleMutation, EmployeeScheduleMutationVariables> & TChildProps;
export function withEmployeeSchedule<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EmployeeScheduleMutation,
  EmployeeScheduleMutationVariables,
  EmployeeScheduleProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, EmployeeScheduleMutation, EmployeeScheduleMutationVariables, EmployeeScheduleProps<TChildProps>>(EmployeeScheduleDocument, {
      alias: 'employeeSchedule',
      ...operationOptions
    });
};

/**
 * __useEmployeeScheduleMutation__
 *
 * To run a mutation, you first call `useEmployeeScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEmployeeScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [employeeScheduleMutation, { data, loading, error }] = useEmployeeScheduleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEmployeeScheduleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EmployeeScheduleMutation, EmployeeScheduleMutationVariables>) {
        return ApolloReactHooks.useMutation<EmployeeScheduleMutation, EmployeeScheduleMutationVariables>(EmployeeScheduleDocument, baseOptions);
      }
export type EmployeeScheduleMutationHookResult = ReturnType<typeof useEmployeeScheduleMutation>;
export type EmployeeScheduleMutationResult = ApolloReactCommon.MutationResult<EmployeeScheduleMutation>;
export type EmployeeScheduleMutationOptions = ApolloReactCommon.BaseMutationOptions<EmployeeScheduleMutation, EmployeeScheduleMutationVariables>;
export const CreateEventDocument = gql`
    mutation CreateEvent($data: EventInput!) {
  createEvent(data: $data) {
    ...Event
  }
}
    ${EventFragmentDoc}`;
export type CreateEventMutationFn = ApolloReactCommon.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;
export type CreateEventComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateEventMutation, CreateEventMutationVariables>, 'mutation'>;

    export const CreateEventComponent = (props: CreateEventComponentProps) => (
      <ApolloReactComponents.Mutation<CreateEventMutation, CreateEventMutationVariables> mutation={CreateEventDocument} {...props} />
    );
    
export type CreateEventProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateEventMutation, CreateEventMutationVariables> & TChildProps;
export function withCreateEvent<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateEventMutation,
  CreateEventMutationVariables,
  CreateEventProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateEventMutation, CreateEventMutationVariables, CreateEventProps<TChildProps>>(CreateEventDocument, {
      alias: 'createEvent',
      ...operationOptions
    });
};

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, baseOptions);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = ApolloReactCommon.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const DeleteEventDocument = gql`
    mutation DeleteEvent($id: String!) {
  deleteEvent(id: $id)
}
    `;
export type DeleteEventMutationFn = ApolloReactCommon.MutationFunction<DeleteEventMutation, DeleteEventMutationVariables>;
export type DeleteEventComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteEventMutation, DeleteEventMutationVariables>, 'mutation'>;

    export const DeleteEventComponent = (props: DeleteEventComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteEventMutation, DeleteEventMutationVariables> mutation={DeleteEventDocument} {...props} />
    );
    
export type DeleteEventProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteEventMutation, DeleteEventMutationVariables> & TChildProps;
export function withDeleteEvent<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteEventMutation,
  DeleteEventMutationVariables,
  DeleteEventProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteEventMutation, DeleteEventMutationVariables, DeleteEventProps<TChildProps>>(DeleteEventDocument, {
      alias: 'deleteEvent',
      ...operationOptions
    });
};

/**
 * __useDeleteEventMutation__
 *
 * To run a mutation, you first call `useDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventMutation, { data, loading, error }] = useDeleteEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteEventMutation, DeleteEventMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument, baseOptions);
      }
export type DeleteEventMutationHookResult = ReturnType<typeof useDeleteEventMutation>;
export type DeleteEventMutationResult = ApolloReactCommon.MutationResult<DeleteEventMutation>;
export type DeleteEventMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteEventMutation, DeleteEventMutationVariables>;
export const EventsDocument = gql`
    query Events($data: QueryEventsInput!) {
  queryEvents(data: $data) {
    items {
      ...Event
    }
    total
  }
}
    ${EventFragmentDoc}`;
export type EventsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<EventsQuery, EventsQueryVariables>, 'query'> & ({ variables: EventsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const EventsComponent = (props: EventsComponentProps) => (
      <ApolloReactComponents.Query<EventsQuery, EventsQueryVariables> query={EventsDocument} {...props} />
    );
    
export type EventsProps<TChildProps = {}> = ApolloReactHoc.DataProps<EventsQuery, EventsQueryVariables> & TChildProps;
export function withEvents<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EventsQuery,
  EventsQueryVariables,
  EventsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, EventsQuery, EventsQueryVariables, EventsProps<TChildProps>>(EventsDocument, {
      alias: 'events',
      ...operationOptions
    });
};

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EventsQuery, EventsQueryVariables>) {
        return ApolloReactHooks.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, baseOptions);
      }
export function useEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, baseOptions);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = ApolloReactCommon.QueryResult<EventsQuery, EventsQueryVariables>;
export const EventDocument = gql`
    query Event($id: String!) {
  queryEvent(id: $id) {
    ...Event
  }
}
    ${EventFragmentDoc}`;
export type EventComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<EventQuery, EventQueryVariables>, 'query'> & ({ variables: EventQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const EventComponent = (props: EventComponentProps) => (
      <ApolloReactComponents.Query<EventQuery, EventQueryVariables> query={EventDocument} {...props} />
    );
    
export type EventProps<TChildProps = {}> = ApolloReactHoc.DataProps<EventQuery, EventQueryVariables> & TChildProps;
export function withEvent<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EventQuery,
  EventQueryVariables,
  EventProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, EventQuery, EventQueryVariables, EventProps<TChildProps>>(EventDocument, {
      alias: 'event',
      ...operationOptions
    });
};

/**
 * __useEventQuery__
 *
 * To run a query within a React component, call `useEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEventQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EventQuery, EventQueryVariables>) {
        return ApolloReactHooks.useQuery<EventQuery, EventQueryVariables>(EventDocument, baseOptions);
      }
export function useEventLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EventQuery, EventQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EventQuery, EventQueryVariables>(EventDocument, baseOptions);
        }
export type EventQueryHookResult = ReturnType<typeof useEventQuery>;
export type EventLazyQueryHookResult = ReturnType<typeof useEventLazyQuery>;
export type EventQueryResult = ApolloReactCommon.QueryResult<EventQuery, EventQueryVariables>;
export const OrganizationDocument = gql`
    query Organization($data: QueryOrganizationInput!) {
  organization(data: $data) {
    ...Organization
  }
}
    ${OrganizationFragmentDoc}`;
export type OrganizationComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<OrganizationQuery, OrganizationQueryVariables>, 'query'> & ({ variables: OrganizationQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const OrganizationComponent = (props: OrganizationComponentProps) => (
      <ApolloReactComponents.Query<OrganizationQuery, OrganizationQueryVariables> query={OrganizationDocument} {...props} />
    );
    
export type OrganizationProps<TChildProps = {}> = ApolloReactHoc.DataProps<OrganizationQuery, OrganizationQueryVariables> & TChildProps;
export function withOrganization<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  OrganizationQuery,
  OrganizationQueryVariables,
  OrganizationProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, OrganizationQuery, OrganizationQueryVariables, OrganizationProps<TChildProps>>(OrganizationDocument, {
      alias: 'organization',
      ...operationOptions
    });
};

/**
 * __useOrganizationQuery__
 *
 * To run a query within a React component, call `useOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useOrganizationQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OrganizationQuery, OrganizationQueryVariables>) {
        return ApolloReactHooks.useQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, baseOptions);
      }
export function useOrganizationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OrganizationQuery, OrganizationQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, baseOptions);
        }
export type OrganizationQueryHookResult = ReturnType<typeof useOrganizationQuery>;
export type OrganizationLazyQueryHookResult = ReturnType<typeof useOrganizationLazyQuery>;
export type OrganizationQueryResult = ApolloReactCommon.QueryResult<OrganizationQuery, OrganizationQueryVariables>;
export const UpdateOrganizationDocument = gql`
    mutation UpdateOrganization($id: String!, $data: OrganizationInput!) {
  updateOrganization(id: $id, data: $data) {
    ...Organization
  }
}
    ${OrganizationFragmentDoc}`;
export type UpdateOrganizationMutationFn = ApolloReactCommon.MutationFunction<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;
export type UpdateOrganizationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>, 'mutation'>;

    export const UpdateOrganizationComponent = (props: UpdateOrganizationComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateOrganizationMutation, UpdateOrganizationMutationVariables> mutation={UpdateOrganizationDocument} {...props} />
    );
    
export type UpdateOrganizationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateOrganizationMutation, UpdateOrganizationMutationVariables> & TChildProps;
export function withUpdateOrganization<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateOrganizationMutation,
  UpdateOrganizationMutationVariables,
  UpdateOrganizationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateOrganizationMutation, UpdateOrganizationMutationVariables, UpdateOrganizationProps<TChildProps>>(UpdateOrganizationDocument, {
      alias: 'updateOrganization',
      ...operationOptions
    });
};

/**
 * __useUpdateOrganizationMutation__
 *
 * To run a mutation, you first call `useUpdateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrganizationMutation, { data, loading, error }] = useUpdateOrganizationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOrganizationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>(UpdateOrganizationDocument, baseOptions);
      }
export type UpdateOrganizationMutationHookResult = ReturnType<typeof useUpdateOrganizationMutation>;
export type UpdateOrganizationMutationResult = ApolloReactCommon.MutationResult<UpdateOrganizationMutation>;
export type UpdateOrganizationMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;
export const CreateServiceDocument = gql`
    mutation CreateService($data: ServiceInput!) {
  createService(data: $data) {
    ...Service
  }
}
    ${ServiceFragmentDoc}`;
export type CreateServiceMutationFn = ApolloReactCommon.MutationFunction<CreateServiceMutation, CreateServiceMutationVariables>;
export type CreateServiceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateServiceMutation, CreateServiceMutationVariables>, 'mutation'>;

    export const CreateServiceComponent = (props: CreateServiceComponentProps) => (
      <ApolloReactComponents.Mutation<CreateServiceMutation, CreateServiceMutationVariables> mutation={CreateServiceDocument} {...props} />
    );
    
export type CreateServiceProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateServiceMutation, CreateServiceMutationVariables> & TChildProps;
export function withCreateService<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateServiceMutation,
  CreateServiceMutationVariables,
  CreateServiceProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateServiceMutation, CreateServiceMutationVariables, CreateServiceProps<TChildProps>>(CreateServiceDocument, {
      alias: 'createService',
      ...operationOptions
    });
};

/**
 * __useCreateServiceMutation__
 *
 * To run a mutation, you first call `useCreateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServiceMutation, { data, loading, error }] = useCreateServiceMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateServiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateServiceMutation, CreateServiceMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateServiceMutation, CreateServiceMutationVariables>(CreateServiceDocument, baseOptions);
      }
export type CreateServiceMutationHookResult = ReturnType<typeof useCreateServiceMutation>;
export type CreateServiceMutationResult = ApolloReactCommon.MutationResult<CreateServiceMutation>;
export type CreateServiceMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateServiceMutation, CreateServiceMutationVariables>;
export const UpdateServiceDocument = gql`
    mutation UpdateService($id: String!, $data: ServiceInput!) {
  updateService(id: $id, data: $data) {
    ...Service
  }
}
    ${ServiceFragmentDoc}`;
export type UpdateServiceMutationFn = ApolloReactCommon.MutationFunction<UpdateServiceMutation, UpdateServiceMutationVariables>;
export type UpdateServiceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateServiceMutation, UpdateServiceMutationVariables>, 'mutation'>;

    export const UpdateServiceComponent = (props: UpdateServiceComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateServiceMutation, UpdateServiceMutationVariables> mutation={UpdateServiceDocument} {...props} />
    );
    
export type UpdateServiceProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateServiceMutation, UpdateServiceMutationVariables> & TChildProps;
export function withUpdateService<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateServiceMutation,
  UpdateServiceMutationVariables,
  UpdateServiceProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateServiceMutation, UpdateServiceMutationVariables, UpdateServiceProps<TChildProps>>(UpdateServiceDocument, {
      alias: 'updateService',
      ...operationOptions
    });
};

/**
 * __useUpdateServiceMutation__
 *
 * To run a mutation, you first call `useUpdateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServiceMutation, { data, loading, error }] = useUpdateServiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateServiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateServiceMutation, UpdateServiceMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateServiceMutation, UpdateServiceMutationVariables>(UpdateServiceDocument, baseOptions);
      }
export type UpdateServiceMutationHookResult = ReturnType<typeof useUpdateServiceMutation>;
export type UpdateServiceMutationResult = ApolloReactCommon.MutationResult<UpdateServiceMutation>;
export type UpdateServiceMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateServiceMutation, UpdateServiceMutationVariables>;
export const DeleteServiceDocument = gql`
    mutation DeleteService($id: String!) {
  deleteService(id: $id)
}
    `;
export type DeleteServiceMutationFn = ApolloReactCommon.MutationFunction<DeleteServiceMutation, DeleteServiceMutationVariables>;
export type DeleteServiceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteServiceMutation, DeleteServiceMutationVariables>, 'mutation'>;

    export const DeleteServiceComponent = (props: DeleteServiceComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteServiceMutation, DeleteServiceMutationVariables> mutation={DeleteServiceDocument} {...props} />
    );
    
export type DeleteServiceProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteServiceMutation, DeleteServiceMutationVariables> & TChildProps;
export function withDeleteService<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteServiceMutation,
  DeleteServiceMutationVariables,
  DeleteServiceProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteServiceMutation, DeleteServiceMutationVariables, DeleteServiceProps<TChildProps>>(DeleteServiceDocument, {
      alias: 'deleteService',
      ...operationOptions
    });
};

/**
 * __useDeleteServiceMutation__
 *
 * To run a mutation, you first call `useDeleteServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServiceMutation, { data, loading, error }] = useDeleteServiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteServiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteServiceMutation, DeleteServiceMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteServiceMutation, DeleteServiceMutationVariables>(DeleteServiceDocument, baseOptions);
      }
export type DeleteServiceMutationHookResult = ReturnType<typeof useDeleteServiceMutation>;
export type DeleteServiceMutationResult = ApolloReactCommon.MutationResult<DeleteServiceMutation>;
export type DeleteServiceMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteServiceMutation, DeleteServiceMutationVariables>;
export const ServicesDocument = gql`
    query Services($data: QueryServicesInput!) {
  services(data: $data) {
    total
    items {
      ...Service
    }
  }
}
    ${ServiceFragmentDoc}`;
export type ServicesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ServicesQuery, ServicesQueryVariables>, 'query'> & ({ variables: ServicesQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const ServicesComponent = (props: ServicesComponentProps) => (
      <ApolloReactComponents.Query<ServicesQuery, ServicesQueryVariables> query={ServicesDocument} {...props} />
    );
    
export type ServicesProps<TChildProps = {}> = ApolloReactHoc.DataProps<ServicesQuery, ServicesQueryVariables> & TChildProps;
export function withServices<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ServicesQuery,
  ServicesQueryVariables,
  ServicesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, ServicesQuery, ServicesQueryVariables, ServicesProps<TChildProps>>(ServicesDocument, {
      alias: 'services',
      ...operationOptions
    });
};

/**
 * __useServicesQuery__
 *
 * To run a query within a React component, call `useServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServicesQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useServicesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ServicesQuery, ServicesQueryVariables>) {
        return ApolloReactHooks.useQuery<ServicesQuery, ServicesQueryVariables>(ServicesDocument, baseOptions);
      }
export function useServicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ServicesQuery, ServicesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ServicesQuery, ServicesQueryVariables>(ServicesDocument, baseOptions);
        }
export type ServicesQueryHookResult = ReturnType<typeof useServicesQuery>;
export type ServicesLazyQueryHookResult = ReturnType<typeof useServicesLazyQuery>;
export type ServicesQueryResult = ApolloReactCommon.QueryResult<ServicesQuery, ServicesQueryVariables>;
export const ServiceDocument = gql`
    query Service($id: String!) {
  service(id: $id) {
    ...Service
  }
}
    ${ServiceFragmentDoc}`;
export type ServiceComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ServiceQuery, ServiceQueryVariables>, 'query'> & ({ variables: ServiceQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const ServiceComponent = (props: ServiceComponentProps) => (
      <ApolloReactComponents.Query<ServiceQuery, ServiceQueryVariables> query={ServiceDocument} {...props} />
    );
    
export type ServiceProps<TChildProps = {}> = ApolloReactHoc.DataProps<ServiceQuery, ServiceQueryVariables> & TChildProps;
export function withService<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ServiceQuery,
  ServiceQueryVariables,
  ServiceProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, ServiceQuery, ServiceQueryVariables, ServiceProps<TChildProps>>(ServiceDocument, {
      alias: 'service',
      ...operationOptions
    });
};

/**
 * __useServiceQuery__
 *
 * To run a query within a React component, call `useServiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useServiceQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServiceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useServiceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ServiceQuery, ServiceQueryVariables>) {
        return ApolloReactHooks.useQuery<ServiceQuery, ServiceQueryVariables>(ServiceDocument, baseOptions);
      }
export function useServiceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ServiceQuery, ServiceQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ServiceQuery, ServiceQueryVariables>(ServiceDocument, baseOptions);
        }
export type ServiceQueryHookResult = ReturnType<typeof useServiceQuery>;
export type ServiceLazyQueryHookResult = ReturnType<typeof useServiceLazyQuery>;
export type ServiceQueryResult = ApolloReactCommon.QueryResult<ServiceQuery, ServiceQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data)
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;
export type RegisterComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RegisterMutation, RegisterMutationVariables>, 'mutation'>;

    export const RegisterComponent = (props: RegisterComponentProps) => (
      <ApolloReactComponents.Mutation<RegisterMutation, RegisterMutationVariables> mutation={RegisterDocument} {...props} />
    );
    
export type RegisterProps<TChildProps = {}> = ApolloReactHoc.MutateProps<RegisterMutation, RegisterMutationVariables> & TChildProps;
export function withRegister<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RegisterMutation,
  RegisterMutationVariables,
  RegisterProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, RegisterMutation, RegisterMutationVariables, RegisterProps<TChildProps>>(RegisterDocument, {
      alias: 'register',
      ...operationOptions
    });
};

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: RegisterInput!) {
  createUser(data: $data) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;
export type CreateUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateUserMutation, CreateUserMutationVariables>, 'mutation'>;

    export const CreateUserComponent = (props: CreateUserComponentProps) => (
      <ApolloReactComponents.Mutation<CreateUserMutation, CreateUserMutationVariables> mutation={CreateUserDocument} {...props} />
    );
    
export type CreateUserProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateUserMutation, CreateUserMutationVariables> & TChildProps;
export function withCreateUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateUserMutation,
  CreateUserMutationVariables,
  CreateUserProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateUserMutation, CreateUserMutationVariables, CreateUserProps<TChildProps>>(CreateUserDocument, {
      alias: 'createUser',
      ...operationOptions
    });
};

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($data: UpdateUserInput!) {
  updateUser(data: $data) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;
export type UpdateUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateUserMutation, UpdateUserMutationVariables>, 'mutation'>;

    export const UpdateUserComponent = (props: UpdateUserComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateUserMutation, UpdateUserMutationVariables> mutation={UpdateUserDocument} {...props} />
    );
    
export type UpdateUserProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateUserMutation, UpdateUserMutationVariables> & TChildProps;
export function withUpdateUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UpdateUserProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateUserMutation, UpdateUserMutationVariables, UpdateUserProps<TChildProps>>(UpdateUserDocument, {
      alias: 'updateUser',
      ...operationOptions
    });
};

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!, $organizationUrlName: String!) {
  login(email: $email, password: $password, organizationUrlName: $organizationUrlName) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    
export type LoginProps<TChildProps = {}> = ApolloReactHoc.MutateProps<LoginMutation, LoginMutationVariables> & TChildProps;
export function withLogin<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      organizationUrlName: // value for 'organizationUrlName'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;
export type LogoutComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LogoutMutation, LogoutMutationVariables>, 'mutation'>;

    export const LogoutComponent = (props: LogoutComponentProps) => (
      <ApolloReactComponents.Mutation<LogoutMutation, LogoutMutationVariables> mutation={LogoutDocument} {...props} />
    );
    
export type LogoutProps<TChildProps = {}> = ApolloReactHoc.MutateProps<LogoutMutation, LogoutMutationVariables> & TChildProps;
export function withLogout<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LogoutMutation,
  LogoutMutationVariables,
  LogoutProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, LogoutMutation, LogoutMutationVariables, LogoutProps<TChildProps>>(LogoutDocument, {
      alias: 'logout',
      ...operationOptions
    });
};

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    
export type MeProps<TChildProps = {}> = ApolloReactHoc.DataProps<MeQuery, MeQueryVariables> & TChildProps;
export function withMe<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MeQuery,
  MeQueryVariables,
  MeProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, MeQuery, MeQueryVariables, MeProps<TChildProps>>(MeDocument, {
      alias: 'me',
      ...operationOptions
    });
};

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const UsersDocument = gql`
    query Users($data: QueryUsersInput!) {
  users(data: $data) {
    items {
      ...User
    }
    total
  }
}
    ${UserFragmentDoc}`;
export type UsersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<UsersQuery, UsersQueryVariables>, 'query'> & ({ variables: UsersQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const UsersComponent = (props: UsersComponentProps) => (
      <ApolloReactComponents.Query<UsersQuery, UsersQueryVariables> query={UsersDocument} {...props} />
    );
    
export type UsersProps<TChildProps = {}> = ApolloReactHoc.DataProps<UsersQuery, UsersQueryVariables> & TChildProps;
export function withUsers<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UsersQuery,
  UsersQueryVariables,
  UsersProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, UsersQuery, UsersQueryVariables, UsersProps<TChildProps>>(UsersDocument, {
      alias: 'users',
      ...operationOptions
    });
};

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
export const UserDocument = gql`
    query User($id: String!) {
  user(id: $id) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type UserComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<UserQuery, UserQueryVariables>, 'query'> & ({ variables: UserQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const UserComponent = (props: UserComponentProps) => (
      <ApolloReactComponents.Query<UserQuery, UserQueryVariables> query={UserDocument} {...props} />
    );
    
export type UserProps<TChildProps = {}> = ApolloReactHoc.DataProps<UserQuery, UserQueryVariables> & TChildProps;
export function withUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UserQuery,
  UserQueryVariables,
  UserProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, UserQuery, UserQueryVariables, UserProps<TChildProps>>(UserDocument, {
      alias: 'user',
      ...operationOptions
    });
};

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: String!) {
  deleteUser(id: $id) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;
export type DeleteUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteUserMutation, DeleteUserMutationVariables>, 'mutation'>;

    export const DeleteUserComponent = (props: DeleteUserComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteUserMutation, DeleteUserMutationVariables> mutation={DeleteUserDocument} {...props} />
    );
    
export type DeleteUserProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteUserMutation, DeleteUserMutationVariables> & TChildProps;
export function withDeleteUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  DeleteUserProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteUserMutation, DeleteUserMutationVariables, DeleteUserProps<TChildProps>>(DeleteUserDocument, {
      alias: 'deleteUser',
      ...operationOptions
    });
};

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;