import mongoose from "mongoose";

const workoutCardSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  exercise_name: { type: String, required: true },
  reps: { type: Number },
  sets: { type: Number },
  weight: { type: Number },
  weight_unit: { type: String },
  intensity: { type: String },
  time: { type: Number },
  time_unit: { type: String },
  is_completed: { type: Boolean, default: false },
});

const WorkoutCard = mongoose.model("WorkoutCard", workoutCardSchema);

export default WorkoutCard;
