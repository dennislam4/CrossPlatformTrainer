import "dotenv/config";
import cors from "cors";
import express from "express";
import * as fitnessDb from "./model.mjs";
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
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return dayNames[number - 1];
};

// CREATE weekly workout list. This also creates the daily workout lists and the workout cards.
app.post("/createWeeklyPlan", async (req, res) => {
  const { user } = req.body;

  // Validate input
  if (!user) {
    return res.status(400).json({ error: "User object is required." });
  }

  if (!user.fitness_goal || !user.fitness_level || !user._id) {
    return res.status(400).json({
      error: "User fitness_goal, fitness_level, and _id are required.",
    });
  }

  try {
    // Determine filter based on user's fitness goal
    const filter = {
      fitness_goal: user.fitness_goal,
      fitness_level: user.fitness_level,
    };

    if (user.fitness_goal === "lose weight") {
      filter.category = { $in: ["plyometrics", "cardio", "strength"] };
    } else if (user.fitness_goal === "build strength") {
      filter.category = { $in: ["strength", "powerlifting", "strongman"] };
    } else if (user.fitness_goal === "build endurance") {
      filter.category = {
        $in: ["cardio", "strongman", "strength", "plyometrics"],
      };
    } else if (user.fitness_goal === "build muscle") {
      filter.category = {
        $in: ["strength", "powerlifting", "strongman", "olympic weightlifting"],
      };
    } else if (user.fitness_goal === "increase flexibility") {
      filter.category = "stretching";
    }
    const exercises = await Exercise.find(filter);
    const weeklyPlan = {
      workouts: [],
      user_id: user._id,
    };

    // Determine number of cards based on fitness level
    const number_of_cards =
      user.fitness_level === "Intermediate"
        ? 4
        : user.fitness_level === "Advanced"
        ? 5
        : 3;

    // Create daily workouts and workout cards
    for (let i = 1; i <= 7; i++) {
      const groupedExercises = groupExercisesByForce(exercises);
      const dailyWorkoutCards = [];
      let selectedForce = null;

      // Generate workout cards for each force group
      for (const force in groupedExercises) {
        if (selectedForce == null) {
          selectedForce = force;
        }
        const forceExercises = groupedExercises[force].slice(
          0,
          number_of_cards
        );

        const createdCards = await Promise.all(
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
              user_id: user._id,
            });
            console.log(`Day ${i} - Created workout card:`, workoutCard);
            return workoutCard.save();
          })
        );
        dailyWorkoutCards.push(...createdCards);
      }
      if (dailyWorkoutCards.length > number_of_cards) {
        dailyWorkoutCards.length = number_of_cards;
      }
      console.log(`Day ${i} - Created workout cards:`, dailyWorkoutCards);

      // Create a daily workout with an array of workout card IDs
      const dailyWorkout = new DailyWorkout({
        name: getDayName(i),
        force: selectedForce,
        user_id: user._id,
        workout_cards: dailyWorkoutCards.map((card) => card._id.toString()),
      });
      console.log(`Daily workout:`, dailyWorkout);
      const savedDailyWorkout = await dailyWorkout.save();

      // Add created daily workout to the weekly plan
      weeklyPlan.workouts.push(savedDailyWorkout._id.toString());
    }

    // Save the weekly plan
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
    email_address: req.body.email,
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

// GET workout card by User ID
app.get("/workoutcards/:_id", async (req, res) => {
  try {
    console.log(`Fetching workout card with ID: ${req.params._id}`);
    const workoutcard = await fitnessDb.getModelById(
      WorkoutCard,
      req.params._id
    );
    if (!workoutcard) {
      console.log("Workout card not found");
      return res.status(404).json({ error: "Workout card not found" });
    }
    console.log("Workout card found:", workoutcard);
    res.json(workoutcard);
  } catch (error) {
    console.error("Error fetching workout card:", error);
    res.status(400).json({ error: "Request to retrieve workout card failed" });
  }
});

// GET WeeklyFitnessPlan list by User ID
app.get("/fitnessplan/:_id", async (req, res) => {
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

// GET daily workout list
app.get("/daily-workouts/:userId/:day?", async (req, res) => {
  try {
    const { userId, day } = req.params;
    const query = {};

    if (userId) query.user_id = userId;
    if (day) query.name = day;

    const workout = await DailyWorkout.findOne(query);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    res.json(workout);
  } catch (error) {
    console.error("Error fetching workout:", error);
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
// UPDATE controller ************************************
app.put("/updateprofile", async (req, res) => {
  const _id = req.body._id;
  const revisedUserData = {
    email_address: req.body.email,
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
    // Update the user document by _id and return the updated document
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      revisedUserData,
      { new: true } // Return the updated document
    );

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
app.put("/workoutcards/:_id", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
