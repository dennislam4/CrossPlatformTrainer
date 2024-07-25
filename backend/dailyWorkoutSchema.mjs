import mongoose from "mongoose";

const dailyWorkoutSchema = mongoose.Schema({
  name: { type: String },
  force: { type: String },
  user_id: { type: String },
  workout_card_1_id: { type: String },
  workout_card_2_id: { type: String },
  workout_card_3_id: { type: String },
  workout_card_4_id: { type: String },
  workout_card_5_id: { type: String },
});

const DailyWorkout = mongoose.model("DailyWorkout", dailyWorkoutSchema);
export default DailyWorkout;
