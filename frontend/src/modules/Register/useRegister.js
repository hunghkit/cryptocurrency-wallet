import { useCallback } from 'react';
import Cookie from 'js-cookie';
import _get from 'lodash/get';
import { useMutation } from '@apollo/react-hooks';

import { MUTATION_REGISTER } from './graphql';
import Errors from '../../helpers/errors';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../Auth/actions';

export const useRegister = () => {
  const dispatch = useDispatch();
  const [register, { data, error }] = useMutation(MUTATION_REGISTER);

  const onRegister = useCallback(
    async (user) => {
      try {
        Cookie.remove('token');
        const rs = await register({ variables: { user } });
        /**
         * Handle remember on this
         */
        Cookie.set('token', _get(rs, 'data.register.token', { expires: 1 }));

        dispatch(loginSuccess(_get(rs, 'data.register.user')));
      } catch (e) {
        return null;
      }
    },
    [dispatch, register],
  );

  return {
    onRegister,
    payload: data,
    error: Errors.selectMessage(error),
  };
};
