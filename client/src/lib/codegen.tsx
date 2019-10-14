/* eslint-disable import/first */ 

export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Event = {
  id: Scalars["ID"];
  datetime: Scalars["DateTime"];
  date: Scalars["String"];
  begins: Scalars["String"];
  ends: Scalars["String"];
  /** duration in minutes */
  duration: Scalars["Int"];
  customer: User;
  employee: User;
};

export type EventInput = {
  datetime: Scalars["DateTime"];
  /** duration in minutes */
  duration: Scalars["Int"];
  employeeId: Scalars["ID"];
};

export type Mutation = {
  login?: Maybe<User>;
  logout?: Maybe<Scalars["String"]>;
  register: User;
  createEvent: Event;
  deleteEvent: Scalars["String"];
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type MutationCreateEventArgs = {
  data: EventInput;
};

export type MutationDeleteEventArgs = {
  id: Scalars["String"];
};

export type Query = {
  users: Array<User>;
  me?: Maybe<User>;
  queryEvents: Array<Event>;
  queryEvent: Event;
};

export type QueryQueryEventArgs = {
  id: Scalars["String"];
};

export type RegisterInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

/** User access role */
export enum Role {
  Customer = "CUSTOMER",
  Employee = "EMPLOYEE",
  Admin = "ADMIN"
}

export type User = {
  id: Scalars["ID"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  name: Scalars["String"];
  email: Scalars["String"];
  role: Role;
  authCount?: Maybe<Scalars["Float"]>;
};
export type UserFieldsFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "firstName" | "lastName" | "name" | "email" | "role"
>;

export type RegisterMutationVariables = {
  data: RegisterInput;
};

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "User" } & UserFieldsFragment;
};

export type LoginMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: Maybe<{ __typename?: "User" } & UserFieldsFragment>;
};

export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type MeQueryVariables = {};

export type MeQuery = { __typename?: "Query" } & {
  me: Maybe<{ __typename?: "User" } & UserFieldsFragment>;
};

export type UsersQueryVariables = {};

export type UsersQuery = { __typename?: "Query" } & {
  users: Array<{ __typename?: "User" } & UserFieldsFragment>;
};

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";

 

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: {};
  User: User;
  ID: Scalars["ID"];
  String: Scalars["String"];
  role: Role;
  Float: Scalars["Float"];
  Event: Event;
  DateTime: Scalars["DateTime"];
  Int: Scalars["Int"];
  Mutation: {};
  RegisterInput: RegisterInput;
  EventInput: EventInput;
  Boolean: Scalars["Boolean"];
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type EventResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Event"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  datetime?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  date?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  begins?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  ends?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  customer?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  employee?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Mutation"]
> = {
  login?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    MutationLoginArgs
  >;
  logout?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  register?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    MutationRegisterArgs
  >;
  createEvent?: Resolver<
    ResolversTypes["Event"],
    ParentType,
    ContextType,
    MutationCreateEventArgs
  >;
  deleteEvent?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    MutationDeleteEventArgs
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Query"]
> = {
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  queryEvents?: Resolver<
    Array<ResolversTypes["Event"]>,
    ParentType,
    ContextType
  >;
  queryEvent?: Resolver<
    ResolversTypes["Event"],
    ParentType,
    ContextType,
    QueryQueryEventArgs
  >;
};

export type UserResolvers<
  ContextType = any,
  ParentType = ResolversTypes["User"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  role?: Resolver<ResolversTypes["role"], ParentType, ContextType>;
  authCount?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  Event?: EventResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
 
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
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterMutationVariables
>;

export const RegisterComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<RegisterMutation, RegisterMutationVariables>,
      "mutation"
    >,
    "variables"
  > & { variables?: RegisterMutationVariables }
) => (
  <ReactApollo.Mutation<RegisterMutation, RegisterMutationVariables>
    mutation={RegisterDocument}
    {...props}
  />
);

export type RegisterProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<RegisterMutation, RegisterMutationVariables>
> &
  TChildProps;
export function withRegister<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    RegisterMutation,
    RegisterMutationVariables,
    RegisterProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    RegisterMutation,
    RegisterMutationVariables,
    RegisterProps<TChildProps>
  >(RegisterDocument, {
    alias: "withRegister",
    ...operationOptions
  });
}
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginMutationVariables
>;

export const LoginComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<LoginMutation, LoginMutationVariables>,
      "mutation"
    >,
    "variables"
  > & { variables?: LoginMutationVariables }
) => (
  <ReactApollo.Mutation<LoginMutation, LoginMutationVariables>
    mutation={LoginDocument}
    {...props}
  />
);

export type LoginProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LoginMutation, LoginMutationVariables>
> &
  TChildProps;
export function withLogin<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >(LoginDocument, {
    alias: "withLogin",
    ...operationOptions
  });
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = ReactApollo.MutationFn<
  LogoutMutation,
  LogoutMutationVariables
>;

export const LogoutComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<LogoutMutation, LogoutMutationVariables>,
      "mutation"
    >,
    "variables"
  > & { variables?: LogoutMutationVariables }
) => (
  <ReactApollo.Mutation<LogoutMutation, LogoutMutationVariables>
    mutation={LogoutDocument}
    {...props}
  />
);

export type LogoutProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LogoutMutation, LogoutMutationVariables>
> &
  TChildProps;
export function withLogout<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LogoutMutation,
    LogoutMutationVariables,
    LogoutProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    LogoutMutation,
    LogoutMutationVariables,
    LogoutProps<TChildProps>
  >(LogoutDocument, {
    alias: "withLogout",
    ...operationOptions
  });
}
export const MeDocument = gql`
  query Me {
    me {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;

export const MeComponent = (
  props: Omit<
    Omit<ReactApollo.QueryProps<MeQuery, MeQueryVariables>, "query">,
    "variables"
  > & { variables?: MeQueryVariables }
) => (
  <ReactApollo.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
);

export type MeProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<MeQuery, MeQueryVariables>
> &
  TChildProps;
export function withMe<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    MeQuery,
    MeQueryVariables,
    MeProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    MeQuery,
    MeQueryVariables,
    MeProps<TChildProps>
  >(MeDocument, {
    alias: "withMe",
    ...operationOptions
  });
}
export const UsersDocument = gql`
  query Users {
    users {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;

export const UsersComponent = (
  props: Omit<
    Omit<ReactApollo.QueryProps<UsersQuery, UsersQueryVariables>, "query">,
    "variables"
  > & { variables?: UsersQueryVariables }
) => (
  <ReactApollo.Query<UsersQuery, UsersQueryVariables>
    query={UsersDocument}
    {...props}
  />
);

export type UsersProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<UsersQuery, UsersQueryVariables>
> &
  TChildProps;
export function withUsers<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    UsersQuery,
    UsersQueryVariables,
    UsersProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    UsersQuery,
    UsersQueryVariables,
    UsersProps<TChildProps>
  >(UsersDocument, {
    alias: "withUsers",
    ...operationOptions
  });
}
 
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;