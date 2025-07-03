const express = require('express')
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const transcribeRoutes = require('./routes/transcribeRoutes');
const analyzeRoutes = require('./routes/analyzeRoutes');
const smartAssistRoutes = require('./routes/smartAssistRoutes');
const { rateLimiter } = require('./middlewares/rateLimiter');
const { errorHandler } = require('./middlewares/errorHandler');
require('dotenv').config();

const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(cors())
app.use(rateLimiter)
app.use("/chat", chatRoutes)
app.use('/transcribe', transcribeRoutes)
app.use('/analyze', analyzeRoutes)
app.use('/smart-assist', smartAssistRoutes)
app.use(errorHandler)

app.listen(PORT, ()=> console.log(`Smart AI API Running at http://localhost:${PORT}`))