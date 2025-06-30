const express = require("express")
const { getAllUsers, createUser, getUserById, updateUser, deleteUser } = require("../controllers/userController")
const userRoutes = express.Router()

// Get All users
userRoutes.get("/", getAllUsers)
// Create new user
userRoutes.post("/", createUser)

// Get an user by id
userRoutes.get("/:id", getUserById)

// Update an user
userRoutes.put("/:id", updateUser)

// Delete an user
userRoutes.delete("/:id", deleteUser)

module.exports = userRoutes