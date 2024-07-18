// Import dependencies.
import "dotenv/config";
import mongoose from "mongoose";

// Connect based on the .env file parameters.
mongoose.connect(process.env.MONGODB_CONNECT_STRING, { useNewUrlParser: true });
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
  if (err) {
    res.status(500).json({ error: "500: Connection to the server failed." });
  } else {
    console.log(
      "Successfully connected to MongoDB fitness_trainer collection using Mongoose."
    );
  }
});
// SCHEMA: Define the collection's schema.
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

const userSchema = mongoose.Schema({
  id: { type: Number },
  email_address: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number },
  resting_heartrate: { type: Number },
  weight: { type: Number },
  weight_unit: { type: String },
  height: { type: Number },
  height_unit: { type: String },
  calculate_as_gender: { type: String },
  avatar_id: { type: String },
  fitness_level: { type: String },
  fitness_goal: { type: String },
  body_type: { type: String },
  weekly_fitness_plan_id: { type: String },
});

const avatarSchema = mongoose.Schema({
  id: { type: String },
  avatar_file: { type: String },
});

const weeklyFitnessPlanSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  workout_1_id: [{ type: String }],
  workout_2_id: [{ type: String }],
  workout_3_id: [{ type: String }],
  workout_4_id: [{ type: String }],
  workout_5_id: [{ type: String }],
  workout_6_id: [{ type: String }],
  workout_71_id: [{ type: String }],
});

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

const workoutCardSchema = mongoose.Schema({
  id: { type: String },
  exercise_name: { type: String, required: true },
  reps: { type: Number },
  sets: { type: Number },
  weight: { type: Number },
  weight_unit: { type: String },
  intensity: { type: String },
  time: { type: Number },
  time_unit: { type: String },
  is_completed: { type: Boolean, required: true, default: false },
});

// Compile the model from the schema.
const Exercise = mongoose.model("Exercise", exerciseSchema);
const User = mongoose.model("User", userSchema);
const Avatar = mongoose.model("Avatar", avatarSchema);
const WeeklyFitnessPlan = mongoose.model(
  "WeeklyFitnessPlan",
  weeklyFitnessPlanSchema
);
const DailyWorkout = mongoose.model("DailyWorkout", dailyWorkoutSchema);
const WorkoutCard = mongoose.model("WorkoutCard", workoutCardSchema);

// CREATE models *****************************************
const createExercise = async (
  name,
  force,
  level,
  mechanic,
  equipment,
  primaryMuscles,
  secondaryMuscles,
  instructions,
  category,
  images,
  exercise_string
) => {
  const exercise = new Exercise({
    name: name,
    force: force,
    level: level,
    mechanic: mechanic,
    equipment: equipment,
    primaryMuscles: primaryMuscles,
    secondaryMuscles: secondaryMuscles,
    instructions: instructions,
    category: category,
    images: images,
    exercise_string: exercise_string,
  });
  return exercise.save();
};

const createUser = async (
  id,
  email_address,
  password,
  name,
  age,
  resting_heartrate,
  weight,
  weight_unit,
  height,
  height_unit,
  calculate_as_gender,
  avatar_id,
  fitness_level,
  fitness_goal,
  body_type,
  weekly_fitness_plan_id
) => {
  const user = new User({
    id: id,
    email_address: email_address,
    password: password,
    name: name,
    age: age,
    resting_heartrate: resting_heartrate,
    weight: weight,
    weight_unit: weight_unit,
    height: height,
    height_unit: height_unit,
    calculate_as_gender: calculate_as_gender,
    avatar_id: avatar_id,
    fitness_level: fitness_level,
    fitness_goal: fitness_goal,
    body_type: body_type,
    weekly_fitness_plan_id: weekly_fitness_plan_id,
  });
  return user.save();
};
// RETRIEVE models *****************************************
// Retrieve based on a filter and return a promise.
const getAllExercises = async (filter) => {
  const query = Exercise.find(filter);
  return query.exec();
};

// Retrieve based on the ID and return a promise.
const getExerciseById = async (_id) => {
  const query = Exercise.findById(_id);
  return query.exec();
};

const getUserById = async (_id) => {
  const query = User.findById(_id);
  return query.exec();
};

// DELETE model based on ID  *****************************************
const deleteExerciseById = async (_id) => {
  const result = await Exercise.deleteOne({ _id: _id });
  return result.deletedCount;
};

// REPLACE model *****************************************************
const replaceExercise = async (
  _id,
  name,
  force,
  level,
  mechanic,
  equipment,
  primaryMuscles,
  secondaryMuscles,
  instructions,
  category,
  images,
  exercise_string
) => {
  const result = await Exercise.replaceOne(
    { _id: _id },
    {
      name: name,
      force: force,
      level: level,
      mechanic: mechanic,
      equipment: equipment,
      primaryMuscles: primaryMuscles,
      secondaryMuscles: secondaryMuscles,
      instructions: instructions,
      category: category,
      images: images,
      exercise_string: exercise_string,
    }
  );
  return result.modifiedCount;
};

const updateUser = async (
  _id,
  email_address,
  password,
  name,
  age,
  resting_heartrate,
  weight,
  weight_unit,
  height,
  height_unit,
  calculate_as_gender,
  avatar_id,
  fitness_level,
  fitness_goal,
  body_type,
  weekly_fitness_plan_id
) => {
  const result = await User.replaceOne(
    { _id: _id },
    {
      email_address: email_address,
      password: password,
      name: name,
      age: age,
      resting_heartrate: resting_heartrate,
      weight: weight,
      weight_unit: weight_unit,
      height: height,
      height_unit: height_unit,
      calculate_as_gender: calculate_as_gender,
      avatar_id: avatar_id,
      fitness_level: fitness_level,
      fitness_goal: fitness_goal,
      body_type: body_type,
      weekly_fitness_plan_id: weekly_fitness_plan_id,
    }
  );
  return result.modifiedCount;
};

// Export variables for use in the controller file.
export {
  createExercise,
  createUser,
  getAllExercises,
  getExerciseById,
  getUserById,
  updateExercise,
  updateUser,
  deleteExerciseById,
  Exercise,
  User,
};
