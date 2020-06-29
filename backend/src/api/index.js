import fs from 'fs';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { ApolloServer } from 'apollo-server-express';
import playground from 'graphql-playground-middleware-express';

import schema from './schema';

const app = express();

const PORT = process.env.PORT || 8080;

// Apollo Server
const graphQLServer = new ApolloServer({
  schema,
  tracing: true,
  cacheControl: true,
  debug: process.env.NODE_ENV !== 'production',
  context: (context) => context.req,
  playground: false,
  introspection: true,
});

app.get(
  '/playground',
  playground({
    endpoint: '/graphql',
    subscriptionEndpoint: `/subscriptions`,
  }),
);

graphQLServer.applyMiddleware({
  app,
  path: '/graphql',
  cors: true,
  bodyParserConfig: { limit: '5mb' },
});

// Exposes the build of the frontend
// to the root / of the server
const frontendDir = path.join(__dirname, '../../../frontend/build');

if (fs.existsSync(frontendDir)) {
  app.use('/', express.static(frontendDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(frontendDir, 'index.html'));
  });
}

const ws = createServer(app);

console.log('process.env.MONGODB_URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

ws.listen(PORT, () => {
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
      onConnect: (connectionParams) => connectionParams,
    },
    {
      server: ws,
      path: '/subscriptions',
    },
  );
});

ws.on('error', (error) => {
  throw error;
});

ws.on('listening', () => {
  console.log(`server is listening on :${PORT}`);
});

module.exports = ws;
