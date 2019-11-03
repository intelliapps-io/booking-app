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
};

export type BaseStoreEntityInput = {
  name: Scalars['String'],
  cost: Scalars['Float'],
  description?: Maybe<Scalars['String']>,
  /** Product or Service ID */
  UPCCode?: Maybe<Scalars['String']>,
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
};

export type EventInput = {
  datetime: Scalars['DateTime'],
  /** duration in minutes */
  duration: Scalars['Int'],
  employeeId: Scalars['ID'],
};

export type Mutation = {
  login?: Maybe<User>,
  logout?: Maybe<Scalars['String']>,
  register: User,
  createEvent: Event,
  deleteEvent: Scalars['Boolean'],
  createService: Service,
  updateService: Service,
  deleteService: Scalars['ID'],
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationRegisterArgs = {
  data: RegisterInput
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

export enum NumberOperator {
  Greater = 'GREATER',
  Lesser = 'LESSER',
  Equal = 'EQUAL'
}

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
  queryEvents: PaginatedEventsResponse,
  queryEvent: Event,
  services: PaginatedServiesResponse,
  service: Service,
};


export type QueryUsersArgs = {
  data: QueryUsersInput
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

export type QueryEventsInput = {
  offset?: Maybe<Scalars['Float']>,
  limit?: Maybe<Scalars['Float']>,
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
};

export type Service = {
  name: Scalars['String'],
  cost: Scalars['Float'],
  description?: Maybe<Scalars['String']>,
  /** Product or Service ID */
  UPCCode?: Maybe<Scalars['String']>,
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

export type User = {
  id: Scalars['ID'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  name: Scalars['String'],
  email: Scalars['String'],
  role: UserRole,
  authCount?: Maybe<Scalars['Float']>,
};

/** User access role */
export enum UserRole {
  Customer = 'CUSTOMER',
  Employee = 'EMPLOYEE',
  Admin = 'ADMIN'
}

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

export type UserFragment = Pick<User, 'id' | 'firstName' | 'lastName' | 'name' | 'email' | 'role'>;

export type RegisterMutationVariables = {
  data: RegisterInput
};


export type RegisterMutation = { register: UserFragment };

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
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

export const UserFragmentDoc = gql`
    fragment User on User {
  id
  firstName
  lastName
  name
  email
  role
}
    `;
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
  register(data: $data) {
    ...User
  }
}
    ${UserFragmentDoc}`;
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
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
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