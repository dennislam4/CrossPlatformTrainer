import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  id: { type: Number },
  email_address: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  age: { type: Number },
  resting_heartrate: { type: Number },
  weight: { type: Number },
  weight_unit: { type: String },
  height: { type: Number },
  height_unit: { type: String },
  calculate_as_gender: { type: String },
  avatar_id: { type: String },
  fitness_level: { type: String },
  fitness_goal: { type: String },
  body_type: { type: String },
  weekly_fitness_plan_id: { type: String },
});

userSchema.statics.getUserByEmailAndPassword = async function (
  email_address,
  password
) {
  const user = await this.findOne({ email_address: email_address });
  if (!user) {
    throw new Error("User not found");
  }
  // TODO: bcrypt.compare(password, user.password)
  if (user.password === password) {
    return user;
  } else {
    throw new Error("Invalid password");
  }
};

const User = mongoose.model("User", userSchema);

export default User;
