import { getBTCUnspent } from '../../modules/Transaction/handlers';

const transactionUnspent = (_, args, context) => {
  switch (args.currency) {
    case 'BTC':
      return getBTCUnspent(context.user.id, args);
    default:
      throw new Error(`${args.currency} is invalid`);
  }
};

const schema = `
  extend type Query {
    transactionUnspent(currency: CurrencyList = BTC, limit: Int = 50, page: Int = 1): TransactionConnection
  }
`;

const resolvers = {
  Query: {
    transactionUnspent,
  },
};

export default {
  schema,
  resolvers,
};
