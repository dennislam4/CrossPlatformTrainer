import mongoose from "mongoose";
import WorkoutCard from "./workoutCardSchema.mjs";

const dailyWorkoutSchema = mongoose.Schema({
  name: { type: String },
  force: { type: String },
  user_id: { type: String },
  workout_cards: [WorkoutCard.schema],
});

const DailyWorkout = mongoose.model("DailyWorkout", dailyWorkoutSchema);
export default DailyWorkout;
