import gql from 'graphql-tag';

export const QUERY_BTC_WALLET = gql`
  query QUERY_BTC_WALLET {
    btc: getBTCWallet {
      address
      network
      balance
      href
    }
  }
`;

export const QUERY_TRANSACTION_LIST = gql`
  query QUERY_TRANSACTION_LIST(
    $currency: CurrencyList = BTC
    $limit: Int = 10
    $page: Int = 1
  ) {
    result: transactionList(currency: $currency, limit: $limit, page: $page) {
      next {
        page
        limit
      }
      nodes {
        txid
        result
        href
        time
        out {
          addr
        }
      }
    }
  }
`;

export const QUERY_EXCHANGE_RATE = gql`
  query QUERY_EXCHANGE_RATE($currency: CurrencyList = BTC) {
    result: exchangeRate(currency: $currency) {
      currency
      symbol
      last
      buy
      sell
    }
  }
`;

export const SUBSCRIPTION_EXCHANGE_RATE = gql`
  subscription SUBSCRIPTION_EXCHANGE_RATE($currency: CurrencyList = BTC) {
    result: exchangeRate(currency: $currency) {
      currency
      symbol
      last
      buy
      sell
    }
  }
`;

export const MUTATION_SENDMONEY = gql`
  mutation MUTATION_SENDMONEY($input: TransactionInput!) {
    result: createTransaction(input: $input) {
      txid
    }
  }
`;
