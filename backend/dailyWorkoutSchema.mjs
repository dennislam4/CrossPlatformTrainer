import mongoose from "mongoose";

const dailyWorkoutSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  fitness_group_id: { type: String, required: true },
  workout_card_1_id: { type: String },
  workout_card_2_id: { type: String },
  workout_card_3_id: { type: String },
  workout_card_4_id: { type: String },
  workout_card_5_id: { type: String },
});

const DailyWorkout = mongoose.model("DailyWorkout", dailyWorkoutSchema);
export default DailyWorkout;