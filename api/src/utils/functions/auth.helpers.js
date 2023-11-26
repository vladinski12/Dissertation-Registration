import * as bcrypt from "bcrypt";
import { JWT_ACCESS_SECRET, NODE_ENV } from "../env.js";
import jwt from "jsonwebtoken";

export const generateAccessToken = (userId, userRole) => {
  const user = {
    id: userId,
    role: userRole,
  };
  return jwt.sign({ user }, JWT_ACCESS_SECRET, {
    expiresIn: NODE_ENV === "development" ? "7d" : "24h",
  });
};

export const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")?.[1];
  return token;
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 12);
};
