import express from "express";
import { verifyToken } from "../utils/verifyToken.util.js";
import {
  commentPost,
  createPost,
  deletePost,
  likeUnlikePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.post("like/:id", verifyToken, likeUnlikePost);
router.post("comment/:id", verifyToken, commentPost);
router.delete("/delete/:id", verifyToken, deletePost);

export default router;