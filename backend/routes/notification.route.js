import express from "express";
import { verifyToken } from "../utils/verifyToken.util.js";
import { getNotifications } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", verifyToken, getNotifications);

export default router;
