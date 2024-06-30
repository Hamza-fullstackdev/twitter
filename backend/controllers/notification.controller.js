import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profilePic",
    });
    await Notification.updateMany({ to: userId }, { read: true });
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

export const deleteNotifications = async (req, res, next) => {
  try {
    const userId = req.user._id;
    await Notification.deleteMany({ to: userId });
    res.status(200).json({ message: "All notifications deleted successfully" });
  } catch (error) {
    next(error);
  }
};
