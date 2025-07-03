const express =require('express')
const chatRoutes = express.Router();
const {body} = require('express-validator');
const { chat } = require('../controllers/chatController');

chatRoutes.post("/", [body('message').notEmpty()], chat)

module.exports = chatRoutes