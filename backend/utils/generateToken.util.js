import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
export const generateTokenAndSendCookie = (userId, res) => {
  const token = jwt.sign({ userId }, config.JWT_SECRET_TOKEN, {
    expiresIn: `${config.JWT_EXPIRATION_TIME}d`,
  });
  res.cookie("jwt", token, {
    maxAge: config.JWT_EXPIRATION_TIME * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};
