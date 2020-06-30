import Wallet from './Wallet';
import GetBTC from './GetBTC';
import Create from './Create';
import Balance from './Balance';

export const schema = [
  Wallet.schema,
  Create.schema,
  GetBTC.schema,
  Balance.schema,
];

export const resolvers = [
  Wallet.resolvers,
  GetBTC.resolvers,
  Create.resolvers,
  Balance.resolvers,
];
