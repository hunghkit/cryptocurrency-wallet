import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import Cookie from 'js-cookie';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
});

const wsLink = new WebSocketLink(
  new SubscriptionClient(process.env.REACT_APP_GRAPHQL_SUB, {
    reconnect: true,
    connectionParams: async () => {
      const token = Cookie.get('token');

      return {
        Authorization: token ? `Bearer ${token}` : null,
      };
    },
  }),
);

const authLink = setContext(async (_, { headers }) => {
  const token = Cookie.get('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.forEach(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       )
//     );
//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

const errorLink = onError(({ response, operation }) => {
  if (operation.operationName === 'IgnoreErrorsQuery') {
    response.errors = undefined;
  }
});

const cache = new InMemoryCache();

export const client = new ApolloClient({
  cache,
  link: authLink.concat(
    split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink,
      errorLink,
    ),
  ),
  connectToDevTools: process.env.NODE_ENV !== 'production',
});
