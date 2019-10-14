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

export type Query = {
  users: Array<User>,
  me?: Maybe<User>,
  queryEvents: Array<Event>,
  queryEvent: Event,
};


export type QueryQueryEventArgs = {
  id: Scalars['String']
};

export type RegisterInput = {
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
};

/** User access role */
export enum Role {
  Customer = 'CUSTOMER',
  Employee = 'EMPLOYEE',
  Admin = 'ADMIN'
}

export type User = {
  id: Scalars['ID'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  name: Scalars['String'],
  email: Scalars['String'],
  role: Role,
  authCount?: Maybe<Scalars['Float']>,
};

export type CreateEventMutationVariables = {
  data: EventInput
};


export type CreateEventMutation = { createEvent: EventFragment };

export type DeleteEventMutationVariables = {
  id: Scalars['String']
};


export type DeleteEventMutation = Pick<Mutation, 'deleteEvent'>;

export type EventsQueryVariables = {};


export type EventsQuery = { queryEvents: Array<EventFragment> };

export type EventQueryVariables = {
  id: Scalars['String']
};


export type EventQuery = { queryEvent: EventFragment };

export type EventFragment = (
  Pick<Event, 'id' | 'datetime' | 'begins' | 'ends' | 'duration'>
  & { customer: UserFieldsFragment, employee: UserFieldsFragment }
);

export type UserFieldsFragment = Pick<User, 'id' | 'firstName' | 'lastName' | 'name' | 'email' | 'role'>;

export type RegisterMutationVariables = {
  data: RegisterInput
};


export type RegisterMutation = { register: UserFieldsFragment };

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = { login: Maybe<UserFieldsFragment> };

export type LogoutMutationVariables = {};


export type LogoutMutation = Pick<Mutation, 'logout'>;

export type MeQueryVariables = {};


export type MeQuery = { me: Maybe<UserFieldsFragment> };

export type UsersQueryVariables = {};


export type UsersQuery = { users: Array<UserFieldsFragment> };

export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
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
    ...UserFields
  }
  employee {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
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
    query Events {
  queryEvents {
    ...Event
  }
}
    ${EventFragmentDoc}`;
export type EventsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<EventsQuery, EventsQueryVariables>, 'query'>;

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
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
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
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
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
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
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
    query Users {
  users {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
export type UsersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<UsersQuery, UsersQueryVariables>, 'query'>;

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