const schema = `
  type Auth {
    token: String!
    tokenExpiration: Int!
  }
`;

const resolvers = {};

export default {
  schema,
  resolvers,
};
