import "dotenv/config";
import express from "express";
import * as fitnessDb from "./model.mjs";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

// CREATE controller ******************************************
app.post("/users", (req, res) => {
  fitnessDb
    .createUser(
      req.body.email_address,
      req.body.password,
      req.body.name,
      req.body.age,
      req.body.resting_heartrate,
      req.body.weight,
      req.body.weight_unit,
      req.body.height,
      req.body.height_unit,
      req.body.calculate_as_gender,
      req.body.avatar_id,
      req.body.fitness_level,
      req.body.fitness_goal,
      req.body.body_type,
      req.body.weekly_fitness_plan_id
    )
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        error: "Could not add this user",
      });
    });
});

// RETRIEVE controller ****************************************************
// GET user by ID
app.get("/user/:_id", (req, res) => {
  const userId = req.params._id;
  fitnessDb
    .getUserById(userId)
    .then((user) => {
      if (user !== null) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ Error: "user not found" });
      }
    })
    .catch((error) => {
      res.status(400).json({ Error: "Request to retrieve user failed" });
    });
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
app.put("/users/:_id", (req, res) => {
  fitnessDb
    .replaceUser(
      req.params._id,
      req.body.email_address,
      req.body.password,
      req.body.name,
      req.body.age,
      req.body.resting_heartrate,
      req.body.weight,
      req.body.weight_unit,
      req.body.height,
      req.body.height_unit,
      req.body.calculate_as_gender,
      req.body.avatar_id,
      req.body.fitness_level,
      req.body.fitness_goal,
      req.body.body_type,
      req.body.weekly_fitness_plan_id
    )

    .then((numUpdated) => {
      if (numUpdated === 1) {
        res.status(200).json({
          _id: req.params._id,
          email_address: req.body.email_address,
          password: req.body.password,
          name: req.body.name,
          age: req.body.age,
          resting_heartrate: req.body.resting_heartrate,
          weight: req.body.weight,
          weight_unit: req.body.weight_unit,
          height: req.body.height,
          height_unit: req.body.height_unit,
          calculate_as_gender: req.body.calculate_as_gender,
          avatar_id: req.body.avatar_id,
          fitness_level: req.body.fitness_level,
          fitness_goal: req.body.fitness_goal,
          body_type: req.body.body_type,
          weekly_fitness_plan_id: req.body.weekly_fitness_plan_id,
        });
      } else {
        res.status(400).json({ Error: "Request to update this user failed" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ Error: "Request to update this user failed" });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
