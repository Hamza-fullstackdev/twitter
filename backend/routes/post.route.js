import express from "express";
import { verifyToken } from "../utils/verifyToken.util.js";
import {
  commentPost,
  createPost,
  deletePost,
  getAllPosts,
  getFollowingPosts,
  getLikedPosts,
  getUserPosts,
  likeUnlikePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/all", verifyToken, getAllPosts);
router.get("/likes/:id", verifyToken, getLikedPosts);
router.get("/following", verifyToken, getFollowingPosts);
router.get("/user/:username", verifyToken, getUserPosts);
router.post("/create", verifyToken, createPost);
router.post("/like/:id", verifyToken, likeUnlikePost);
router.post("/comment/:id", verifyToken, commentPost);
router.delete("/delete/:id", verifyToken, deletePost);

export default router;
