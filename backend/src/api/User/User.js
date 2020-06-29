const schema = `
  type User {
    id: String!
    email: String!
    gender: String
    lastName: String
    firstName: String
  }

  extend type Auth {
    user: User!
  }
`;

const resolvers = {};

export default {
  schema,
  resolvers,
};
