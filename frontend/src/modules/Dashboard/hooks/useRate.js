import { useEffect } from 'react';
import _get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';

import Errors from '../../../helpers/errors';
import { SUBSCRIPTION_EXCHANGE_RATE, QUERY_EXCHANGE_RATE } from './graphql';

export const useRate = () => {
  const { data, error, loading, subscribeToMore } = useQuery(
    QUERY_EXCHANGE_RATE,
  );

  useEffect(() => {
    subscribeToMore({
      document: SUBSCRIPTION_EXCHANGE_RATE,
      updateQuery: (prev, { subscriptionData }) =>
        subscriptionData.data || prev,
    });
  }, [subscribeToMore]);

  return {
    loading,
    rates: _get(data, 'result', []),
    error: Errors.selectMessage(error),
  };
};
