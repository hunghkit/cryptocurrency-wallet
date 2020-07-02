import { useCallback, useEffect } from 'react';
import _get from 'lodash/get';
import { useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/react-hooks';

import Errors from '../../helpers/errors';
import { QUERY_PROFILE } from './graphql';
import { loginSuccess } from './actions';

export const useAuth = () => {
  const dispatch = useDispatch();
  const [profile, { error, data }] = useLazyQuery(QUERY_PROFILE);

  const onProfile = useCallback(async () => {
    return await profile();
  }, [profile]);

  useEffect(() => {
    if (_get(data, 'user')) {
      dispatch(loginSuccess(_get(data, 'user')));
    }
  }, [data, dispatch]);

  return {
    onProfile,
    error: Errors.selectMessage(error),
  };
};
