const express = require("express");
const app = express();
require("dotenv").config();

app.get("/home", (req, res) => res.status(200).send("Hello World"));

app.post("/users", (req, res) => {
  const userData = req.body;
  res.set({
    Authorization: "Bearer token12122",
    "Access-Control-Expose-Headers": "Authorization",
  });
  res.status(201).json({
    message: "User created successfully",
    data: userData,
  });
});
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  if (userDeleted > 0) {
    res.status(200).json({
      status: 200,
      message: "User deleted successfully",
      data: {
        id: userId,
      },
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "User not found or could not be deleted",
    });
  }
});

app.patch("/users/:id", (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  if (userId > 0) {
    res.status(200).json({
      status: 200,
      message: "User updated successfully",
      data: {
        id: userId,
        ...updatedUserData,
      },
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "User not found or could not be updated",
    });
  }
});
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  if (userId > 0) {
    res.status(200).json({
      status: 200,
      message: "User updated successfully",
      data: {
        id: userId,
        ...updatedUserData,
      },
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "User not found or could not be updated",
    });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`server is running on http://localhost:${process.env.PORT}`)
);
