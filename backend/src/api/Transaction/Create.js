import { createBTCTransaction } from '../../modules/Transaction/handlers';

const createTransaction = (_, args, context) => {
  switch (args.input.currency) {
    case 'BTC':
      return createBTCTransaction(context.user.id, args.input);
    default:
      throw new Error(`${args.currency} is invalid`);
  }
};

const schema = `
  extend type Mutation {
    createTransaction(input: TransactionInput!): Transaction!
  }

  input TransactionInput {
    amount: Float!
    recipient: String!
    currency: CurrencyList = BTC
  }
`;

const resolvers = {
  Mutation: {
    createTransaction,
  },
};

export default {
  schema,
  resolvers,
};
