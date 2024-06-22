import express from "express";
import { profile, followUnfollowUser, getSuggestedUsers, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.util.js";

const router = express.Router();

router.get("/profile/:username", verifyToken, profile);
router.post("/follow/:id", verifyToken, followUnfollowUser);
router.get("/suggested", verifyToken, getSuggestedUsers);
router.post("/update",verifyToken, updateUser);
export default router;
