import dotenv from "dotenv";
dotenv.config();

const _config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  JWT_SECRET_TOKEN: process.env.JWT_SECRET_TOKEN,
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
  NODE_ENV: process.env.NODE_ENV,
  COOKIE_SECRET_TOKEN: process.env.COOKIE_SECRET_TOKEN,
};

export const config = Object.freeze(_config);
