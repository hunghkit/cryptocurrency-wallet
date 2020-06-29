import jwt from 'jsonwebtoken';

import User from '../User';

const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRES_TIME = process.env.EXPIRES_TIME;

export const Login = async ({ email, password }) => {
  const user = await User.authenticate({ email, password });

  const token = jwt.sign({ loginKey: user.loginKey }, SECRET_KEY, {
    expiresIn: EXPIRES_TIME,
  });

  return { user: user, token: token, tokenExpiration: EXPIRES_TIME };
};
