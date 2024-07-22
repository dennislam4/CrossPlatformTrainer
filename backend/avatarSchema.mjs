import mongoose from "mongoose";

const avatarSchema = mongoose.Schema({
  id: { type: String },
  avatar_file: { type: String },
});

const Avatar = mongoose.model("Avatar", avatarSchema);

export default Avatar;
