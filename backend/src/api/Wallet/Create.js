import { createBTCWallet } from '../../modules/User/handlers';

const createWallet = (_, args, context) => {
  switch (args.currency) {
    case 'BTC':
      return createBTCWallet(context.user.id);
    default:
      throw new Error(`${args.currency} is invalid`);
  }
};

const schema = `
  extend type Mutation {
    createWallet(currency: CurrencyList = BTC): Wallet!
  }

  enum CurrencyList {
    BTC
  }
`;

const resolvers = {
  Mutation: {
    createWallet,
  },
};

export default {
  schema,
  resolvers,
};
