import jwt from "jsonwebtoken";
import errorHandler from "./errorHandler.util.js";
import { config } from "../config/config.js";
import User from "../models/user.model.js";
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return next(errorHandler(400, "Unauthorized: No Token Provided"));
    }
    const decodedToken = jwt.verify(token, config.JWT_SECRET_TOKEN);
    if (!decodedToken) {
      return next(errorHandler(400, "Unauthorized: Invalid Token Provided"));
    }

    const user = await User.findById(decodedToken.userId).select("-password");
    if (!user) {
      return next(errorHandler(400, "Unauthorized: User not found"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
