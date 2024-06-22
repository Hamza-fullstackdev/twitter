import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import Notification from "../models/notification.model.js";
import errorHandler from "../utils/errorHandler.util.js";

export const profile = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) return next(errorHandler(400, { message: "User not found" }));
  } catch (error) {
    next(error);
  }
};

export const followUnfollowUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);
    if (id === req.user._id.toString())
      return next(errorHandler(400, "You cannot follow/unfollow Yourself"));
    if (!userToModify || !currentUser)
      return next(errorHandler(400, "User not found"));

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      const newNotification = new Notification({
        type: "follow",
        from: req.user._id,
        to: userToModify._id,
      });
      await newNotification.save();
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    next(error);
  }
};

export const getSuggestedUsers = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const usersFollowedByMe = await User.findById(userId).select("following");

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      { $sample: { size: 10 } },
    ]);

    const filteredUsers = users.filter(
      (user) => !usersFollowedByMe.following.includes(user._id)
    );
    const suggestedUsers = filteredUsers.slice(0, 4);
    suggestedUsers.forEach((user) => (user.password = null));
    res.status(200).json(suggestedUsers);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { fullname, email, username, currentPassword, newPassword, bio, link } =
    req.body;
  let { profileImg, coverImg } = req.body;
  const userId = req.user._id;

  try {
    let user = await User.findById(userId);
    if (!user) return next(errorHandler(400, "User not found"));
    if ((!newPassword && currentPassword) || (!currentPassword && newPassword))
      return next(
        errorHandler(
          400,
          "Please provide both current password and new password"
        )
      );
    if (currentPassword && newPassword) {
      const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (currentPassword === newPassword)
        return next(
          errorHandler(
            400,
            "New Password Should Be Different From Current Password"
          )
        );
      if (!isPasswordCorrect)
        return next(errorHandler(400, "Current password is incorrect"));
      if (newPassword.length < 6)
        return next(
          errorHandler(400, "Password must be at least 6 characters")
        );
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }
    if (profileImg) {
      if (user.profileImg) {
        await cloudinary.v2.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadedResponse.secure_url;
    }
    if (coverImg) {
      if (user.coverImg) {
        await cloudinary.v2.uploader.destroy(
          user.coverImg.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(coverImg);
      coverImg = uploadedResponse.secure_url;
    }
    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;

    user = await user.save();
    user.password = null;
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
