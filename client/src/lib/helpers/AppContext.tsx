import React from "react";
import { User, MeQuery, MeQueryVariables } from "../codegen";
import { QueryResult } from "react-apollo";

interface IAppContext {
  user: User | null,
  meQuery: QueryResult<MeQuery, MeQueryVariables>
}

export const AppContext = React.createContext<IAppContext>({
  user: null,
  meQuery: null as any
});