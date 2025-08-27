import { ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";
import { HttpLink } from "@apollo/client";

export const makeApolloClient = () => {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`,
    fetchOptions: {
      cache: "no-store",
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "network-only",
      },
    },
    link: httpLink,
  });
};
