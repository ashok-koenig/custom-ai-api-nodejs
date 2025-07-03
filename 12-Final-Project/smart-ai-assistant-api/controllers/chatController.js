const {validationResult} = require('express-validator');
const { getChatResponse } = require('../services/openaiService');

exports.chat = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const message = req.body.message;
    const reply = await getChatResponse(message)
    res.json({reply})
}