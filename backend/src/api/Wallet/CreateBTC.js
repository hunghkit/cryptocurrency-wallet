import { createBTCWallet as createWallet } from '../../modules/User/handlers';

const createBTCWallet = (_, _args, context) => {
  console.log('createBTCWallet:', context.user.id);
  return createWallet(context.user.id);
};

const schema = `
  extend type Mutation {
    createBTCWallet: Wallet!
  }
`;

const resolvers = {
  Mutation: {
    createBTCWallet,
  },
};

export default {
  schema,
  resolvers,
};
