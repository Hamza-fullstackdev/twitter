import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import errorHandler from "../utils/errorHandler.util.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res, next) => {
  try {
    const { text } = req.body;
    let { img } = req.body;
    const userId = req.user._id.toString();

    const user = await User.findById(userId);
    if (!user) return next(errorHandler(400, "User not found"));
    if (!text && !img)
      return next(errorHandler(400, "Post must have text or img"));
    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }
    const newPost = new Post({
      user: userId,
      text,
      img,
    });
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    next(error);
  }
};

export const likeUnlikePost = async (req, res, next) => {};

export const commentPost = async (req, res, next) => {};
export const deletePost = async (req, res, next) => {};
