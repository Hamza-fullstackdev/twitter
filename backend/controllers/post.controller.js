import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";
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

export const likeUnlikePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) return next(errorHandler(400, "Post not found"));

    const userLikedPost = post.likes.includes(userId);

    if (userLikedPost) {
      post.likes.pull(userId);
      await post.save();
      res.status(200).json({ message: "Post unliked Successfully" });
    } else {
      post.likes.push(userId);
      await post.save();
      const notification = new Notification({
        from: userId,
        to: post.user,
        type: "like",
      });
      await notification.save();
      res.status(200).json({ message: "Post liked Successfully" });
    }
  } catch (error) {
    next(error);
  }
};

export const commentPost = async (req, res, next) => {
  try {
    const { text } = req.body;
    const postid = req.params.id;
    const userid = req.user._id;

    if (!text) return next(errorHandler(400, "Text field is required"));
    const post = await Post.findById(postid);
    if (!post) return next(errorHandler(400, "Post not Found"));
    const comment = {
      user: userid,
      text,
    };
    post.comments.push(comment);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id.toString();
    const post = await Post.findById(postId);
    if (!post) return next(errorHandler(400, "Post not found"));
    if (post.user.toString() !== userId)
      return next(
        errorHandler(400, "You are not authorized to delete this post")
      );
    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
