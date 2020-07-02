import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const DEFAULT_ERROR_MESSAGE = 'Something wrong';

export const selectErrorMessage = (error) => {
  if (!error) {
    return null;
  }

  if (
    error &&
    error.graphQLErrors &&
    error.graphQLErrors.length &&
    error.graphQLErrors[0].message
  ) {
    return error.graphQLErrors[0].message;
  }

  if (
    error &&
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors &&
    error.networkError.result.errors.length &&
    error.networkError.result.errors[0].message
  ) {
    return error.networkError.result.errors[0].message;
  }

  return error.message || DEFAULT_ERROR_MESSAGE;
};

export const selectErrorCode = (error) => {
  if (!error) {
    return 200;
  }

  if (error && error.networkError) {
    if (
      error.networkError.result &&
      error.networkError.result.errors &&
      error.networkError.result.errors.length &&
      error.networkError.result.errors[0].code
    ) {
      return Number(error.networkError.result.errors[0].code);
    }

    if (error.networkError.statusCode) {
      return Number(error.networkError.statusCode);
    }
  }

  if (error && error.graphQLErrors && error.graphQLErrors.length) {
    return 400;
  }

  return 500;
};

export default class Errors {
  static handle(error) {
    const history = useHistory();

    if (process.env.NODE_ENV !== 'test') {
      console.error(selectErrorMessage(error));
      console.error(error);
    }

    if (selectErrorCode(error) === 403) {
      return history.push('/403');
    }

    if (selectErrorCode(error) === 400) {
      return history.push('/400');
    }

    return history.push('/500');
  }

  static errorCode(error) {
    return selectErrorCode(error);
  }

  static selectMessage(error) {
    return selectErrorMessage(error);
  }

  static showMessage(error) {
    toast.error(selectErrorMessage(error));
  }
}
