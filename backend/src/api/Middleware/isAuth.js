import jwt from 'jsonwebtoken';
import { getUserBy } from '../../modules/User/handlers';

const SECRET_KEY = process.env.SECRET_KEY;

export default async (req, res, next) => {
  req.user = {};

  try {
    const authHeader = req.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('No Token');
    }

    const token = authHeader.substring(7, authHeader.length);
    const decodedToken = jwt.verify(token, SECRET_KEY);

    if (decodedToken) {
      req.user = await getUserBy(
        { loginKey: decodedToken.loginKey },
        { email: 1 },
      );
    }
  } catch (e) {
    req.user = {};
  } finally {
    next();
  }
};
