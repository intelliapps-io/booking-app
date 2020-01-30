import React from "react";
import { AppContext } from "../AppContext";
import { Redirect } from "react-router-dom";

export function useRedirectError(): { renderRedirectError: (options: { title: React.ReactNode, message: React.ReactNode }) => React.ReactNode } {
  return ({
    renderRedirectError: ({title, message}: { title: React.ReactNode, message: React.ReactNode }) => 
      <Redirect to={`/error/${encodeURI(JSON.stringify({ title, message }))}`}/>
  })
}

