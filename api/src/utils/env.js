import 'dotenv/config';

export const {
  NODE_ENV,
  PORT = 3000,
  JWT_ACCESS_SECRET,
  MAX_FILE_SIZE,
} = process.env;
