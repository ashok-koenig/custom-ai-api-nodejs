const express = require("express")
const userRoutes = require("./routes/userRoutes")
require('dotenv').config();

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())

app.use("/users", userRoutes)

app.listen(PORT, ()=> console.log("API running at http://localhost:"+PORT))