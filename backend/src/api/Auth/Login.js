import { Login as _Login } from '../../modules/User/handlers';

const login = (_, args) => _Login(args.user);

const schema = `
  extend type Mutation {
    login(user: AuthInput!): Auth!
  }

  input AuthInput {
    email: String!
    password: String!
  }
`;

const resolvers = {
  Mutation: {
    login,
  },
};

export default {
  schema,
  resolvers,
};
