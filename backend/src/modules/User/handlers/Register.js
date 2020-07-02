import User from '../User';
import { Login } from './Login';
import { createBTCWallet } from './BTCWalletCreate';

export const Register = async (input) => {
  const user = await User.register(input);
  await createBTCWallet(user.id);
  return Login(input);
};
