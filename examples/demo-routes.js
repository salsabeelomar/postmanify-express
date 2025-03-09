const express = require("express");
const router = express.Router();
require("dotenv").config();

// Middleware
router.use(express.json());

// Routes
router.get("/home", (req, res) => res.status(200).send("Hello World"));

router.post("/users", (req, res) => {
  const userData = req.body;
  res.set({
    Authorization: "Bearer token12122",
  });
  res.status(201).json({
    message: "User created successfully",
    data: userData,
  });
});

router.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const userDeleted = 1;

  if (userDeleted > 0) {
    res.status(200).json({
      status: 200,
      message: "User deleted successfully",
      data: { id: userId },
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "User not found or could not be deleted",
    });
  }
});

router.patch("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUserData = req.body;

  if (userId > 0) {
    res.status(200).json({
      status: 200,
      message: "User updated successfully",
      data: { id: userId, ...updatedUserData },
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "User not found or could not be updated",
    });
  }
});

router.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUserData = req.body;

  if (userId > 0) {
    res.status(200).json({
      status: 200,
      message: "User updated successfully",
      data: { id: userId, ...updatedUserData },
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "User not found or could not be updated",
    });
  }
});

const app = express();
app.use(router);

// Start server only if not in test environment
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`server is running on http://localhost:${PORT}`)
  );
}

module.exports = app;
