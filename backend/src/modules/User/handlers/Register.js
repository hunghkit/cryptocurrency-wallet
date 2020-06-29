import User from '../User';
import { Login } from './Login';

export const Register = async (input) => {
  await User.register(input);
  return Login(input);
};
