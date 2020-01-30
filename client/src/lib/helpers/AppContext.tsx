import React from "react";
import { User, MeQuery, MeQueryVariables, Organization, OrganizationQuery, OrganizationQueryVariables } from "../codegen";
import { QueryResult } from "react-apollo";
import { RouteComponentProps } from "@reach/router";
import { StaticContext } from "react-router";

interface IAppContext {
  user: User | null,
  meQuery: QueryResult<MeQuery, MeQueryVariables>,
  organization: Organization | null,
  organizationQuery: QueryResult<OrganizationQuery, OrganizationQueryVariables>
  router: RouteComponentProps<{}>
}

export const AppContext = React.createContext<IAppContext>({
  user: null,
  meQuery: null as any,
  organization: null,
  organizationQuery: null as any,
  router: null as any,
});

// for organization query
export function getOrganizationUrlName(): string | null {
  const { hostname } = window.location
  const hostSplit = hostname.split('.')
  if (hostname.indexOf('localhost') > -1)
    if (hostSplit[0] === 'localhost')
      return null
    else
      return hostSplit[0]
  else
    if (hostSplit.length <= 2)
      return null
    else
      return hostSplit[0]
}