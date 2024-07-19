import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
  name: { type: String, required: true },
  force: { type: String },
  level: { type: String, required: true },
  mechanic: { type: String },
  equipment: { type: String, required: true },
  primaryMuscles: [{ type: String }],
  secondaryMuscles: [{ type: String }],
  instructions: [{ type: String }],
  category: { type: String, required: true },
  images: [{ type: String }],
  exercise_string: { type: String },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;
