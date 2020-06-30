import Rate from './Rate';
import List from './List';
import Create from './Create';
import Unspent from './Unspent';
import Transaction from './Transaction';

export const schema = [
  Transaction.schema,
  Create.schema,
  Unspent.schema,
  List.schema,
  Rate.schema,
];

export const resolvers = [
  Transaction.resolvers,
  Create.resolvers,
  Unspent.resolvers,
  List.resolvers,
  Rate.resolvers,
];
