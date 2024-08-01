import "dotenv/config";
import cors from "cors";
import express from "express";
import * as fitnessDb from "./model.mjs";
import mongoose from "mongoose";
import User from "./userSchema.mjs";
import Exercise from "./exerciseSchema.mjs";
import DailyWorkout from "./dailyWorkoutSchema.mjs";
import WeeklyFitnessPlan from "./weeklyFitnessPlanSchema.mjs";
import WorkoutCard from "./workoutCardSchema.mjs";

const PORT = process.env.PORT || 2355;
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// SIGN IN controller ******************************************
app.post("/signin", async (req, res) => {
  const email_address = req.body.email_address;
  const password = req.body.password;

  try {
    const user = await User.getUserByEmailAndPassword(email_address, password);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Login failed" });
  }
});

// SIGN UP (Create user)
app.post("/signup", async (req, res) => {
  const { name, email_address, password } = req.body;
  console.log("signup", req.body);
  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email_address });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }
    const newUserData = {
      name,
      email_address,
      password,
    };
    const newUser = await fitnessDb.createDocument(User, newUserData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Could not create user account." });
  }
});

// helper method to group exercises for a weekly plan
const groupExercisesByForce = (exercises) => {
  return exercises.reduce((groupedExercises, exercise) => {
    const { force } = exercise;
    if (!groupedExercises[force]) {
      groupedExercises[force] = [];
    }
    groupedExercises[force].push(exercise);
    return groupedExercises;
  }, {});
};

// helper method for day name
const getDayName = (number) => {
  const dayNames = [
    null,
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return dayNames[number];
};

// helper method for exercise filter
const getExerciseFilter = (user) => {
  const filter = {
    fitness_goal: user.fitness_goal,
    fitness_level: user.fitness_level,
  };

  switch (user.fitness_goal) {
    case "Lose Weight":
    default:
      filter.category = { $in: ["plyometrics", "cardio", "strength"] };
      break;
    case "Build Strength":
      filter.category = { $in: ["strength", "powerlifting", "strongman"] };
      break;
    case "Build Endurance":
      filter.category = {
        $in: ["cardio", "strongman", "strength", "plyometrics"],
      };
      break;
    case "Build Muscle":
      filter.category = {
        $in: ["strength", "powerlifting", "strongman", "olympic weightlifting"],
      };
      break;
    case "Increase Flexibility":
      filter.category = "stretching";
      break;
  }
  return filter;
};

// CREATE weekly workout list. This also creates the daily workout lists and the workout cards.
app.post("/createWeeklyPlan", async (req, res) => {
  const { user } = req.body;
  console.log("createWeeklyPlan", user);

  // Validate input
  if (!user) {
    return res.status(400).json({ error: "User object is required." });
  }

  try {
    // Convert user_id to ObjectId
    user.user_id = mongoose.Types.ObjectId(user.user_id);

    // Check if a WeeklyFitnessPlan already exists for the user
    const existingPlan = await WeeklyFitnessPlan.findOne({
      user_id: user.user_id,
    });

    // If an existing plan is found, delete it
    if (existingPlan) {
      await WeeklyFitnessPlan.deleteOne({ _id: existingPlan._id });

      // Delete any existing daily workouts and workout cards for the user
      await DailyWorkout.deleteMany({ user_id: user.user_id });
      await WorkoutCard.deleteMany({ user_id: user.user_id });
    }

    const filter = getExerciseFilter(user);

    const exercises = await Exercise.find(filter);
    const weeklyPlan = {
      workouts: [],
      user_id: user.user_id,
    };

    // Determine number of weekly workouts based on fitness level
    const number_of_workouts =
      user.fitness_level === "Intermediate"
        ? 4
        : user.fitness_level === "Advanced"
        ? 5
        : 3;

    // Group exercises by force
    const groupedExercises = groupExercisesByForce(exercises);
    const forceGroups = Object.keys(groupedExercises);
    let forceIndex = 0;

    // Create daily workouts and workout cards
    let workoutCount = 0;
    for (let i = 0; i < 7; i++) {
      if (
        workoutCount < number_of_workouts &&
        (i % 2 === 0 ||
          workoutCount < number_of_workouts - (7 - number_of_workouts))
      ) {
        const selectedForce = forceGroups[forceIndex];

        // This selects 5 exercises from each kind of force to create a daily workout.
        forceIndex = (forceIndex + 1) % forceGroups.length;
        const forceExercises = groupedExercises[selectedForce].slice(0, 5);

        const dailyWorkoutCards = await Promise.all(
          forceExercises.map((exercise) => {
            const workoutCard = new WorkoutCard({
              exercise_name: exercise.name,
              reps: 10,
              sets: 3,
              weight: 0,
              weight_unit: "lbs",
              intensity: "medium",
              time: 0,
              time_unit: "seconds",
              is_completed: false,
              user_id: user.user_id,
            });
            return workoutCard.save();
          })
        );

        // Create a daily workout with an array of workout card IDs
        const dailyWorkout = new DailyWorkout({
          name: getDayName(i + 1),
          force: selectedForce,
          user_id: user.user_id,
          workout_cards: dailyWorkoutCards.map((card) => card._id),
        });
        const savedDailyWorkout = await dailyWorkout.save();

        // Add created daily workout to the weekly plan
        weeklyPlan.workouts.push(savedDailyWorkout._id.toString());
        workoutCount++;
      } else {
        // Create a rest day with no workout cards
        const dailyWorkout = new DailyWorkout({
          name: getDayName(i + 1),
          force: "rest",
          user_id: user.user_id,
          workout_cards: [],
        });
        const savedDailyWorkout = await dailyWorkout.save();

        // Add created rest day to the weekly plan
        weeklyPlan.workouts.push(savedDailyWorkout._id.toString());
      }
    }

    const newWeeklyPlan = new WeeklyFitnessPlan(weeklyPlan);
    await newWeeklyPlan.save();
    res.status(201).json(newWeeklyPlan);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Could not create weekly plan." });
  }
});

// CREATE userprofile (from fitness survey)
app.post("/createprofile", async (req, res) => {
  const newUserData = {
    email_address: req.body.email_address,
    password: req.body.password,
    name: req.body.name,
    age: req.body.age,
    weight: req.body.weight,
    height_unit: req.body.height_unit,
    weight_unit: req.body.weight_unit,
    fitness_level: req.body.fitness_level,
    fitness_goal: req.body.fitness_goal,
    body_type: req.body.body_type,
    height_feet: req.body.height_feet,
    height_inches: req.body.height_inches,
    height_meters: req.body.height_meters,
    height_centimeters: req.body.height_centimeters,
    avatar: req.body.avatar,
  };
  try {
    const newUser = await fitnessDb.createDocument(User, newUserData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Could not create user profile." });
  }
});

// RETRIEVE controller ****************************************************
// GET userprofile by User ID
app.get("/userprofile/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await fitnessDb.getModelById(User, userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Request to retrieve user failed" });
  }
});

// GET workout card by Workout Card ID
app.get("/workoutcards/:_id", async (req, res) => {
  try {
    const workoutcard = await fitnessDb.getModelById(
      WorkoutCard,
      req.params._id
    );
    if (!workoutcard) {
      // console.log("Workout card not found");
      return res.status(404).json({ error: "Workout card not found" });
    }
    // console.log("Workout card found:", workoutcard);
    res.json(workoutcard);
  } catch (error) {
    console.error("Error fetching workout card:", error);
    res.status(400).json({ error: "Request to retrieve workout card failed" });
  }
});

// GET WeeklyFitnessPlan list by User ID
app.get("/fitnessplan/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const query = {};

    if (userId) query.user_id = userId;

    const workouts = await WeeklyFitnessPlan.findOne(query); // Fetch workouts from the database

    res.json(workouts); // Send the filtered workouts as a JSON response
  } catch (error) {
    console.error("Error fetching workouts:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Send error response
  }
});

// GET Daily Workout by userId and day
app.get("/daily-workouts/:userId/:day", async (req, res) => {
  try {
    const { userId, day } = req.params;

    // Fetch the daily workout
    const dailyWorkout = await DailyWorkout.findOne({
      user_id: userId,
      name: day,
    }).populate("workout_cards"); // Populate the workout_cards field with WorkoutCard details

    if (!dailyWorkout) {
      return res.status(404).json({ error: "Daily workout not found" });
    }
    res.json(dailyWorkout);
  } catch (error) {
    console.error("Error fetching daily workout:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE Controller ******************************
app.delete("/exercises/:_id", (req, res) => {
  fitnessDb
    .deleteModelById(Exercise, req.params._id)
    .then((deletedCount) => {
      if (deletedCount === 1) {
        res.status(204).send();
      } else {
        res.status(404).json({ Error: "This exercise not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send({ error: "Request to delete this exercise failed" });
    });
});

// DELETE workout card
app.delete("/workoutcards/:_id", (req, res) => {
  fitnessDb
    .deleteModelById(WorkoutCard, req.params._id)
    .then((deletedCount) => {
      if (deletedCount === 1) {
        res.status(204).send();
      } else {
        res.status(404).json({ Error: "This workout card not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res
        .status(400)
        .send({ error: "Request to delete this workout card failed" });
    });
});

// DELETE user
app.delete("/userprofile/:_id", (req, res) => {
  fitnessDb
    .deleteModelById(User, req.params._id)
    .then((deletedCount) => {
      if (deletedCount === 1) {
        res.status(204).send();
      } else {
        res.status(404).json({ Error: "This user not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send({ error: "Request to delete this user failed" });
    });
});

// UPDATE controller ************************************
app.put("/updateprofile", async (req, res) => {
  const { user } = req.body;
  const _id = user._id;
  const revisedUserData = {
    email_address: user.email_address,
    password: user.password,
    name: user.name,
    age: user.age,
    weight: user.weight,
    height_unit: user.height_unit,
    weight_unit: user.weight_unit,
    fitness_level: user.fitness_level,
    fitness_goal: user.fitness_goal,
    body_type: user.body_type,
    height_feet: user.height_feet,
    height_inches: user.height_inches,
    height_meters: user.height_meters,
    height_centimeters: user.height_centimeters,
    avatar: user.avatar,
    calculate_as_gender: user.calculate_as_gender,
  };
  try {
    // Update the user document by _id and return the updated document
    const updatedUser = await User.findByIdAndUpdate(_id, revisedUserData, {
      new: true,
    });

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Request to update this user failed" });
  }
});

// UPDATE workout card
app.put("/updateworkoutcards/:_id", async (req, res) => {
  const _id = req.params._id;
  const revisedWorkoutCardData = {
    exercise_name: req.body.exercise_name,
    reps: req.body.reps,
    sets: req.body.sets,
    weight: req.body.weight,
    weight_unit: req.body.weight_unit,
    intensity: req.body.intensity,
    time: req.body.time,
    time_unit: req.body.time_unit,
    is_completed: req.body.is_completed,
  };

  try {
    const result = await fitnessDb.updateDocument(
      WorkoutCard,
      _id,
      revisedWorkoutCardData
    );

    if (result.modifiedCount > 0) {
      // Fetch the updated document to return
      const updatedWorkoutCard = await WorkoutCard.findById(_id);
      res.status(200).json(updatedWorkoutCard);
    } else {
      res.status(404).json({ error: "Workout card not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ error: "Request to update this workout card failed" });
  }
});

// UPDATE daily workout list
app.put("/daily-workouts/:userId/:day", async (req, res) => {
  try {
    const { userId, day } = req.params;
    const { workoutCards } = req.body;

    // Validate input
    if (!workoutCards || !Array.isArray(workoutCards)) {
      return res.status(400).json({ error: "Invalid workout cards data" });
    }

    // Fetch the daily workout
    const dailyWorkout = await DailyWorkout.findOne({
      user_id: userId,
      name: day,
    });

    if (!dailyWorkout) {
      return res.status(404).json({ error: "Daily workout not found" });
    }

    // Update workout cards
    const updatedWorkoutCards = await Promise.all(
      workoutCards.map(async (card) => {
        // Update existing workout card if there is one
        if (card._id) {
          const updatedCard = await WorkoutCard.findByIdAndUpdate(
            card._id,
            { $set: card },
            { new: true }
          );
          return updatedCard;
        } else {
          // Create new workout card
          const newCard = new WorkoutCard({
            ...card,
            user_id: userId,
          });
          return newCard.save();
        }
      })
    );

    // Update the daily workout with the new workout card IDs
    dailyWorkout.workout_cards = updatedWorkoutCards.map((card) => card._id);

    const updatedDailyWorkout = await dailyWorkout.save();

    res.json(updatedDailyWorkout);
  } catch (error) {
    console.error("Error updating daily workout:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: "Request to retrieve users failed" });
  }
});

app.get("/exercises", async (req, res) => {
  try {
    const filter = getExerciseFilter(req.body);
    const exercises = await Exercise.find(filter);
    res.json(exercises);
  } catch (error) {
    res.status(400).json({ error: "Request to retrieve exercises failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
