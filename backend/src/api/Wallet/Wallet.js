const schema = `
  type Wallet {
    currency: Currency
    address: String!
    balance: Float
  }

  type Currency {
    name: String
    symbol: String
  }

  extend type User {
    wallets: [Wallet!]
  }
`;

const resolvers = {};

export default {
  schema,
  resolvers,
};
