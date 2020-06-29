import { makeExecutableSchema } from 'apollo-server-express';

import pubsub from './pubsub';

const typeDefs = [
  `
    type Query {
      greeting: String
    }

    type Mutation {
      greeting: String
    }

    type Subscription {
      greeting: String
    }
  `,
  require('./Auth').schema,
  require('./User').schema,
  require('./Wallet').schema,
].flat();

const resolvers = [
  {
    Query: {
      greeting: () => '[Query] - hello world',
    },
    Mutation: {
      greeting: () => '[Mutation] - hello world',
    },
    Subscription: {
      greeting: {
        subscribe: () => pubsub.asyncIterator('GREETING_MESSAGE'),
      },
    },
  },
  require('./Auth').resolvers,
  require('./User').resolvers,
  require('./Wallet').resolvers,
].flat();

export default makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});
