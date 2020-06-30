import { getBTCWallet as getWallet } from '../../modules/User/handlers';

const getBTCWallet = (_, _args, context) => {
  return getWallet(context.user.id);
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
