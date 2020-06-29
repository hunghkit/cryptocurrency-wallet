import Wallet from './Wallet';
import GetBTC from './GetBTC';
import CreateBTC from './CreateBTC';

export const schema = [Wallet.schema, CreateBTC.schema, GetBTC.schema];

export const resolvers = [
  Wallet.resolvers,
  CreateBTC.resolvers,
  GetBTC.resolvers,
];
