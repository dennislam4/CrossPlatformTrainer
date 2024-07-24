import mongoose from "mongoose";

const weeklyFitnessPlanSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  workout_1_id: [{ type: String }],
  workout_2_id: [{ type: String }],
  workout_3_id: [{ type: String }],
  workout_4_id: [{ type: String }],
  workout_5_id: [{ type: String }],
  workout_6_id: [{ type: String }],
  workout_7_id: [{ type: String }],
  user_id: { type: String },
});

const WeeklyFitnessPlan = mongoose.model(
  "WeeklyFitnessPlan",
  weeklyFitnessPlanSchema
);

export default WeeklyFitnessPlan;
