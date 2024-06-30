import mongoose from "mongoose";

const userScheama = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    profilimg: {
      type: String,
      default:
        "https://res.cloudinary.com/gaurav/image/upload/v1631691111/twitter/default-profile-pic_y0q12o.jpg",
    },
    coverimg: {
      type: String,
      default:
        "https://res.cloudinary.com/gaurav/image/upload/v1631691111/twitter/default-profile-pic_y0q12o.jpg",
    },
    bio: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    likedPosts:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: []
      }
    ]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userScheama);
export default User;
