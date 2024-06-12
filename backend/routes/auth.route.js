import express from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyToken.util.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get('/getme',verifyToken,getMe);

export default router;
