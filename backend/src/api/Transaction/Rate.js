import { withFilter } from 'apollo-server';

import pubsub from '../pubsub';
import { getBTCRate } from '../../modules/Transaction/handlers';

export const EXCHANGE_RATE = 'EXCHANGE_RATE';

const fetRate = (currency) => {
  switch (currency) {
    case 'BTC':
      return getBTCRate();
    default:
      throw new Error(`${currency} is invalid`);
  }
};

const exchangeRate = async (_, { currency }) => {
  const rates = await fetRate(currency);
  pubsub.publish(EXCHANGE_RATE, { exchangeRate: rates, currency });

  if (global.intervalRate) {
    clearInterval(global.intervalRate);
  }

  global.intervalRate = setInterval(async () => {
    const rates = await fetRate(currency);
    pubsub.publish(EXCHANGE_RATE, { exchangeRate: rates, currency });
  }, 20 * 1000);

  return rates;
};

const schema = `
  extend type Query {
    exchangeRate(currency: CurrencyList = BTC): [ExchangeRate]
  }

  extend type Subscription {
    exchangeRate(currency: CurrencyList = BTC): [ExchangeRate]
  }

  type ExchangeRate {
    currency: String
    symbol: String
    last: Float
    buy: Float
    sell: Float
  }
`;

const resolvers = {
  Query: {
    exchangeRate,
  },
  Subscription: {
    exchangeRate: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(EXCHANGE_RATE),
        (payload, variables) => payload.currency === variables.currency,
      ),
    },
  },
};

export default {
  schema,
  resolvers,
};
