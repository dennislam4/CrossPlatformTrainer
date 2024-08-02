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
  height_unit: { type: String },
  calculate_as_gender: { type: String },
  avatar: { type: String },
  fitness_level: { type: String },
  fitness_goal: { type: String },
  body_type: { type: String },
  height_feet: { type: Number },
  height_inches: { type: Number },
  height_meters: { type: Number },
  height_centimeters: { type: Number },
  bmi: { type: Number },
  daily_calories: { type: Number },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const isBcryptHash = (password) => {
  const bcryptHashRegex = /^\$2[ayb]\$.{56}$/;
  return bcryptHashRegex.test(password);
};

userSchema.statics.getUserByEmailAndPassword = async function (
  email_address,
  password
) {
  const user = await this.findOne({ email_address: email_address });
  if (!user) {
    throw new Error("User with this email address not found");
  }
  const storedPassword = user.password;
  if (isBcryptHash(storedPassword)) {
    const isPasswordMatch = await bcrypt.compare(password, storedPassword);
    if (!isPasswordMatch) {
      throw new Error("Invalid password");
    }
  } else {
    if (user.password !== password) {
      throw new Error("Invalid password");
    }
  }
  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
