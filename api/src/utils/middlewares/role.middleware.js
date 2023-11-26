import { CUSTOM_ERROR_MESSAGES } from "../constants.js";
import { HttpException } from "../http-exception.js";
import { getTokenFromRequest } from "../functions/auth.helpers.js";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../env.js";

export const RoleMiddleware = (role) => (req, _res, next) => {
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

  if (payload?.user?.role !== role || !role.includes(payload?.user?.role))
    return next(new HttpException(CUSTOM_ERROR_MESSAGES.FORBIDDEN, 403));

  const { user } = payload;

  req.user = user;

  return next();
};
