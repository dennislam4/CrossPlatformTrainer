import mongoose from "mongoose";

const dailyWorkoutSchema = new mongoose.Schema({
  name: { type: String },
  force: { type: String },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  workout_cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "WorkoutCard" }],
});

const DailyWorkout = mongoose.model("DailyWorkout", dailyWorkoutSchema);
export default DailyWorkout;
