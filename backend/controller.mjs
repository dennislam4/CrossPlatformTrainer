import "dotenv/config";
import cors from "cors";
import express from "express";
import * as fitnessDb from "./model.mjs";
import User from "./userSchema.mjs";
import Exercise from "./exerciseSchema.mjs";

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
  const newUserData = {
    name: req.body.name,
    email_address: req.body.email_address,
    password: req.body.password,
  };
  try {
    const newUser = await fitnessDb.createDocument(User, newUserData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Could not create user account." });
  }
});

// CREATE weekly workout list
// get exercises, filtered by fitness_goal, fitness_level, category
app.get("/exercises", async (req, res) => {
  const filter = {
    fitness_goal: req.query.fitness_goal,
    fitness_level: req.query.fitness_level,
  };

  if (req.query.fitness_goal === "lose weight") {
    filter.category = { $in: ["plyometrics", "cardio", "strength"] };
  } else if (req.query.fitness_goal === "build strength") {
    filter.category = { $in: ["stength", "powerlifting", "strongman"] };
  } else if (req.query.fitness_goal === "build endurance") {
    filter.category = {
      $in: ["cardio", "strongman", "strength", "plyometrics"],
    };
  } else if (req.query.fitness_goal === "build muscle") {
    filter.category = {
      $in: ["strength", "powerlifting", "strongman", "olympic weightlifting"],
    };
  } else if (req.query.fitness_goal === "increase flexibility") {
    filter.category = "stretching";
  }

  try {
    const exercises = await fitnessDb.getAllDocuments(Exercise, filter);
    res.status(200).json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Request to retrieve exercises failed" });
  }
});

// RETRIEVE controller ****************************************************
// GET user by ID
app.get("/users/:_id", async (req, res) => {
  const userId = req.params._id;
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

// DELETE Controller ******************************
app.delete("/exercises/:_id", (req, res) => {
  fitnessDb
    .deleteExerciseById(req.params._id)
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

// UPDATE controller ************************************
app.put("/updateprofile", async (req, res) => {
  const _id = req.body._id;
  const revisedUserData = {
    email_address: req.body.email,
    password: req.body.password,
    name: req.body.name,
    age: req.body.age,
    weight: req.body.weight,
    height: req.body.height,
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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
