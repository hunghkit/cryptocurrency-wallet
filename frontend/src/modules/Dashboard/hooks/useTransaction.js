import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

import Errors from '../../../helpers/errors';
import { MUTATION_SENDMONEY } from './graphql';

export const useTransaction = (reset) => {
  const [submit, { error, data, loading }] = useMutation(MUTATION_SENDMONEY, {
    refetchQueries: ['QUERY_TRANSACTION_LIST'],
    awaitRefetchQueries: true,
  });

  const onSubmit = useCallback(
    async (input) => {
      try {
        console.log('reset:', reset);
        await submit({ variables: { input } });
        reset({ recipient: '', amount: 0 });
      } catch (e) {
        console.log('error:', e);
      }
    },
    [submit, reset],
  );

  return {
    data,
    loading,
    onSubmit,
    error: Errors.selectMessage(error),
  };
};
