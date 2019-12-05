import React from "react";
import { User, MeQuery, MeQueryVariables, Organization, OrganizationQuery, OrganizationQueryVariables } from "../codegen";
import { QueryResult } from "react-apollo";

interface IAppContext {
  user: User | null,
  meQuery: QueryResult<MeQuery, MeQueryVariables>,
  organization: Organization | null,
  organizationQuery: QueryResult<OrganizationQuery, OrganizationQueryVariables>
}

export const AppContext = React.createContext<IAppContext>({
  user: null,
  meQuery: null as any,
  organization: null,
  organizationQuery: null as any
});

// export function getOrganizationUrlName(): string | null {

// }