import { createUsingNetwork } from '../../services/btc';

const schema = `
  type Wallet {
    currency: Currency
    address: String!
    network: String
    href: String
  }

  type Currency {
    name: String
    symbol: String
  }

  extend type User {
    wallets: [Wallet!]
  }
`;

const resolvers = {
  Wallet: {
    href: (wallet) => {
      const api = createUsingNetwork(wallet);
      return `${api.detail}/address/${wallet.address}`;
    },
  },
};

export default {
  schema,
  resolvers,
};
