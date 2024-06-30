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

export const deleteNotification = async (req, res, next) => {
  const notificationId = req.params.id;
  const userId = req.user._id;
  try {
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return next(errorHandler(400, "Notification not found"));
    }
    if (notification.to.toString() !== userId.toString())
      return next(
        errorHandler(400, "You are not allowed to delete this notification")
      );
    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    next(error);
  }
};
