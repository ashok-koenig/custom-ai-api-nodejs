const express = require("express")
const cors = require("cors")
const logger = require("./middleware/logger")
const errorHandler = require("./middleware/errorHandler")
const taskRoutes = require("./routes/taskRoutes")

const app = express()
// Middleware
app.use(cors())
app.use(express.json())
app.use(logger)

app.use("/tasks", taskRoutes)
// Error Handler
app.use(errorHandler)


app.listen(3000, ()=> console.log("API running at http://localhost:3000"))