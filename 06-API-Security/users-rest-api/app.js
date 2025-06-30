const express = require("express")
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const userRoutes = require("./routes/userRoutes")
require('dotenv').config();

const PORT = process.env.PORT || 5000
const app = express()

const corsOptions = {
    origin: process.env.FRONTEND_URL || "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}

const contentSecurityPolicy = process.env.ENABLE_SECURITY_POLICY

const apiLimiter = rateLimit({
  windowMs: 5 * 1000, // 5 seconds
  max: 5,                 // limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,   // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false     // Disable the `X-RateLimit-*` headers
});


app.use(cors(corsOptions))

app.use("/",apiLimiter)
app.use(helmet({contentSecurityPolicy: false}))
app.use(express.json())



app.use("/users", userRoutes)

app.listen(PORT, ()=> console.log("API running at http://localhost:"+PORT))