import mongoose from "mongoose";

const weeklyFitnessPlanSchema = mongoose.Schema({
  workouts: [{ type: String }],
  user_id: { type: String, required: true },
});

const WeeklyFitnessPlan = mongoose.model(
  "WeeklyFitnessPlan",
  weeklyFitnessPlanSchema
);

export default WeeklyFitnessPlan;
