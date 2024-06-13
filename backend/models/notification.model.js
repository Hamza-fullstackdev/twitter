import mongoose from "mongoose";

const notificationScheama = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["like", "follow"],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timeseries: true }
);

const Notification = mongoose.model("Notification", notificationScheama);
export default Notification;
