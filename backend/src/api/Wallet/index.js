import Wallet from './Wallet';
import GetBTC from './GetBTC';
import CreateBTC from './CreateBTC';
import GetBalance from './GetBalance';

export const schema = [
  Wallet.schema,
  CreateBTC.schema,
  GetBTC.schema,
  GetBalance.schema,
];

export const resolvers = [
  Wallet.resolvers,
  GetBTC.resolvers,
  CreateBTC.resolvers,
  GetBalance.resolvers,
];
