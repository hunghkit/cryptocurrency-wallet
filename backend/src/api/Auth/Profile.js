const profile = (_, _args, context) => context.user;

const schema = `
  extend type Query {
    profile: User
  }
`;

const resolvers = {
  Query: {
    profile,
  },
};

export default {
  schema,
  resolvers,
};
