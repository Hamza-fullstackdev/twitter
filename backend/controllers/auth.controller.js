import { config } from "../config/config.js";
import User from "../models/user.model.js";
import errorHandler from "../utils/errorHandler.util.js";
import { generateTokenAndSendCookie } from "../utils/generateToken.util.js";
import bcrypt from "bcryptjs";

export const signupUser = async (req, res, next) => {
  const { fullname, username, email, password } = req.body;
  if (!fullname || !username || !password || !email)
    return next(errorHandler(400, "Please fill the necessary fields"));
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(errorHandler(400, "Please enter a valid email"));
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return next(errorHandler(400, "Username is already taken"));
    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return next(errorHandler(400, "User already exist with this email"));
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      generateTokenAndSendCookie(newUser._id, res);
      await newUser.save();
      const { password, ...rest } = newUser._doc;
      res.status(200).json(rest);
    } else {
      next(errorHandler(400, "Invalid User data"));
    }
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    return next(errorHandler(400, "All fields are required"));
  const existingUser = await User.findOne({ username });
  if(!existingUser) return next(errorHandler(400, "Please enter correct username"));
  try {
    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) return next(errorHandler(400, "Invalid password"));
      if (isMatch) {
        generateTokenAndSendCookie(existingUser._id, res);
        const { password, ...rest } = existingUser._doc;
        res.status(200).json(rest);
      } else {
        return next(errorHandler(400, "Invalid Credentials"));
      }
    }
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie(config.COOKIE_SECRET_TOKEN);
    res.status(200).json({ message: "User logged out Successfully" });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
