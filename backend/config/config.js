import dotenv from "dotenv";
dotenv.config();

const _config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  JWT_SECRET_TOKEN: process.env.JWT_SECRET_TOKEN,
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
  NODE_ENV: process.env.NODE_ENV,
  COOKIE_SECRET_TOKEN: process.env.COOKIE_SECRET_TOKEN,
  BCRYPT_SALT: process.env.BCRYPT_SALT,
  CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY,
};

export const config = Object.freeze(_config);
