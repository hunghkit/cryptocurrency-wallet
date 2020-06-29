import { createBTCWallet as createWallet } from '../../modules/User/handlers';

const createBTCWallet = (_, args) => {
  console.log('createBTCWallet:', args);
  return createWallet('5efacb934bc2717f60355bb4');
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
