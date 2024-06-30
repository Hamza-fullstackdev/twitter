import express from "express";
import { verifyToken } from "../utils/verifyToken.util.js";
import { deleteNotifications, getNotifications } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", verifyToken, getNotifications);
router.delete("/delete", verifyToken, deleteNotifications);

export default router;
