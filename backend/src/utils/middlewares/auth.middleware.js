import { CUSTOM_ERROR_MESSAGES } from '../constants.js';
import HttpException from '../http-exception.js';
import { JWT_ACCESS_SECRET } from '../env.js';
import { getTokenFromRequest } from '../functions/auth.helpers.js';
import jwt from 'jsonwebtoken';

const AuthMiddleware = async (req, _res, next) => {
  const token = getTokenFromRequest(req);
  if (!token) {
    return next(new HttpException(CUSTOM_ERROR_MESSAGES.UNAUTHORIZED, 401));
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_ACCESS_SECRET);
  } catch (e) {
    return next(new HttpException(CUSTOM_ERROR_MESSAGES.FORBIDDEN, 403));
  }

  const { user } = payload;
  req.user = user;

  return next();
};

export default AuthMiddleware;
