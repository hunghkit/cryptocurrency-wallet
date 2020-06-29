import { Register as _Register } from '../../modules/User/handlers';

const register = (_, args) => _Register(args.user);

const schema = `
  extend type Mutation {
    register(user: RegisterInput!): Auth!
  }

  input RegisterInput {
    email: String!
    password: String!
    confirmPassword: String!

    firstName: String
    lastName: String
    gender: String
  }
`;

const resolvers = {
  Mutation: {
    register,
  },
};

export default {
  schema,
  resolvers,
};
