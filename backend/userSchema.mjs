import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: Number },
  email_address: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
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

const User = mongoose.model("User", userSchema);

export default User;
