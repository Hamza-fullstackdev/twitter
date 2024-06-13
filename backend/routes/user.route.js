import express from "express";
import { profile, followUnfollowUser, getSuggestedUsers } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.util.js";

const router = express.Router();

router.get("/profile/:username", verifyToken, profile);
router.post("/follow/:id", verifyToken, followUnfollowUser);
router.get("/suggested", verifyToken, getSuggestedUsers);

export default router;
