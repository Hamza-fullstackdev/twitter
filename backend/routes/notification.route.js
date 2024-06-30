import express from "express";
import { verifyToken } from "../utils/verifyToken.util.js";
import {
  deleteNotification,
  deleteNotifications,
  getNotifications,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", verifyToken, getNotifications);
router.delete("/delete", verifyToken, deleteNotifications);
router.delete("/delete/:id", verifyToken, deleteNotification);

export default router;
