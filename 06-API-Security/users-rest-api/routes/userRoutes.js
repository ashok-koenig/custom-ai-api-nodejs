const express = require("express")
const { getAllUsers, createUser, getUserById, updateUser, deleteUser } = require("../controllers/userController")
const { validateUser } = require("../validations/userValidation")
const { validationErrorHandler } = require("../validations/validationErrorHandler")
const userRoutes = express.Router()

// Get All users
userRoutes.get("/", getAllUsers)
// Create new user
userRoutes.post("/", validateUser,validationErrorHandler, createUser)

// Get an user by id
userRoutes.get("/:id", getUserById)

// Update an user
userRoutes.put("/:id",validateUser,validationErrorHandler, updateUser)

// Delete an user
userRoutes.delete("/:id", deleteUser)

module.exports = userRoutes