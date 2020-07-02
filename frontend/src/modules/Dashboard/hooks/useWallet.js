import _get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';

import Errors from '../../../helpers/errors';
import { QUERY_BTC_WALLET } from './graphql';

export const useWallet = () => {
  const { error, data, loading } = useQuery(QUERY_BTC_WALLET, {
    fetchPolicy: 'network-only',
  });

  return {
    loading,
    btc: _get(data, 'btc'),
    error: Errors.selectMessage(error),
  };
};
