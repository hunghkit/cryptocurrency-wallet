import { getBTCList } from '../../modules/Transaction/handlers';

const transactionList = (_, args, context) => {
  switch (args.currency) {
    case 'BTC':
      return getBTCList(context.user.id, args);
    default:
      throw new Error(`${args.currency} is invalid`);
  }
};

const schema = `
  extend type Query {
    transactionList(currency: CurrencyList = BTC, limit: Int = 50, page: Int = 1): TransactionConnection
  }

  type Page {
    limit: Int
    page: Int
  }

  type TransactionConnection {
    nodes: [Transaction]
    next: Page
  }
`;

const resolvers = {
  Query: {
    transactionList,
  },
};

export default {
  schema,
  resolvers,
};
