import { useCallback } from 'react';
import Cookie from 'js-cookie';
import _get from 'lodash/get';
import { useMutation } from '@apollo/react-hooks';

import { MUTATION_LOGIN } from './graphql';
import Errors from '../../helpers/errors';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../Auth/actions';

export const useLogin = () => {
  const dispatch = useDispatch();
  const [login, { data, error }] = useMutation(MUTATION_LOGIN);

  const onLogin = useCallback(
    async ({ remember, ...user }) => {
      try {
        Cookie.remove('token');
        const rs = await login({
          variables: { user },
          awaitRefetchQueries: true,
        });
        /**
         * Handle remember on this
         */
        Cookie.set(
          'token',
          _get(rs, 'data.login.token', { expires: remember ? 1 : null }),
        );

        dispatch(loginSuccess(_get(rs, 'data.login.user')));
      } catch (e) {
        return null;
      }
    },
    [dispatch, login],
  );

  return {
    onLogin,
    payload: data,
    error: Errors.selectMessage(error),
  };
};
