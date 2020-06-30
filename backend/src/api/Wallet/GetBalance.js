import { getBTCBalance } from '../../modules/User/handlers';

const getBalanceResolver = (wallet) => {
  try {
    switch (wallet.currency.symbol) {
      case 'BTC':
        return getBTCBalance(wallet);
      default:
        return 0;
    }
  } catch (e) {
    console.warn('getBalanceResolver:', e.message);
    return 0;
  }
};

const schema = `
  extend type Wallet {
    balance: Float!
  }
`;

const resolvers = {
  Wallet: {
    balance: getBalanceResolver,
  },
};

export default {
  schema,
  resolvers,
};
