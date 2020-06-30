const schema = `
  type Transaction {
    txid: String!
    tx_index: Int!
    ver: Int
    weight: Int
    block_height: Int
    relayed_by: String
    lock_time: Int
    size: Int
    block_index: Int
    time: Int
    vin_sz: Int
    vout_sz: Int
    result: Float
    out: [TransactionBlockInput]
    inputs: [TransactionBlockInput]
  }

  type TransactionBlockInput {
    sequence: Int
    witness: String!
    prev_out: TransactionBlockInputPrevious
    script: String!
  }

  type TransactionBlockInputPrevious {
    spent: Boolean
    tx_index: Int
    type: Int
    addr: String
    value: Float
    n: Int
    script: String!
  }

  extend type Wallet {
    transactions: [Transaction!]
  }
`;

const resolvers = {};

export default {
  schema,
  resolvers,
};
