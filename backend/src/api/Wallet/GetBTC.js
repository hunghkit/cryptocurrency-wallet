import { getBTCWallet as getWallet } from '../../modules/User/handlers';

const getBTCWallet = (_, args) => {
  console.log('getBTCWallet:', args);
  return getWallet('5efacb934bc2717f60355bb4');
};

const schema = `
  extend type Query {
    getBTCWallet: Wallet!
  }
`;

const resolvers = {
  Query: {
    getBTCWallet,
  },
};

export default {
  schema,
  resolvers,
};
