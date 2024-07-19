// Import dependencies.
import "dotenv/config";
import mongoose from "mongoose";
import Exercise from "./exerciseSchema.mjs";
import User from "./userSchema.mjs";
import Avatar from "./avatarSchema.mjs";
import WeeklyFitnessPlan from "./weeklyFitnessPlanSchema.mjs";
import DailyWorkout from "./dailyWorkoutSchema.mjs";
import WorkoutCard from "./workoutCardSchema.mjs";

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

// CREATE models *****************************************
const createDocument = async (Model, data) => {
  const newDocument = new Model(data);
  return newDocument.save();
};

// RETRIEVE models *****************************************
// Retrieve all records based on a filter and return a promise.
const getAllDocuments = async (Model, filter) => {
  const query = Model.find(filter);
  return query.exec();
};

// Retrieve based on the ID and return a promise.
const getModelById = async (Model, _id) => {
  const query = Model.findById(_id);
  return query.exec();
};

// DELETE model based on ID  *****************************************
const deleteModelById = async (Model, _id) => {
  const result = await Model.deleteOne({ _id: _id });
  return result.deletedCount;
};

// REPLACE model *****************************************************
const updateDocument = async (Model, _id, updateData) => {
  const result = await Model.replaceOne({ _id: _id }, updateData);
  return result.modifiedCount;
};

// Export variables for use in the controller file.
export {
  createDocument,
  getAllDocuments,
  getModelById,
  deleteModelById,
  updateDocument,
  Exercise,
  User,
  Avatar,
  WeeklyFitnessPlan,
  DailyWorkout,
  WorkoutCard,
};
