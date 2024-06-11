import dotenv from "dotenv";
dotenv.config();

const _config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
};

export const config = Object.freeze(_config);
