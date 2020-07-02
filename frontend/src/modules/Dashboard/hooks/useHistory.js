import _get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';

import Errors from '../../../helpers/errors';
import { QUERY_TRANSACTION_LIST } from './graphql';

export const useHistory = () => {
  const { error, data, loading } = useQuery(QUERY_TRANSACTION_LIST, {
    fetchPolicy: 'network-only',
  });

  return {
    loading,
    next: _get(data, 'result.next'),
    nodes: _get(data, 'result.nodes'),
    error: Errors.selectMessage(error),
  };
};
