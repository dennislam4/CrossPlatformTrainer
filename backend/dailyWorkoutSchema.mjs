import mongoose from "mongoose";

const dailyWorkoutSchema = mongoose.Schema({
  name: { type: String },
  force: { type: String },
  user_id: { type: String },
  workout_cards: [{ type: String }],
});

const DailyWorkout = mongoose.model("DailyWorkout", dailyWorkoutSchema);
export default DailyWorkout;
