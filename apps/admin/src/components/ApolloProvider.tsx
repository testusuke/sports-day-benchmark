"use client";

import type { ReactNode } from "react";
import { ApolloNextAppProvider as Provider } from "@apollo/client-integration-nextjs";
import { makeApolloClient } from "@/util/ApolloClient";

export const ApolloProvider = ({ children }: { children: ReactNode }) => {
  return <Provider makeClient={makeApolloClient}>{children}</Provider>;
};
