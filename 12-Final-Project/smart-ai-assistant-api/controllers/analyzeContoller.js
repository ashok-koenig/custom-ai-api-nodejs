
const fs=require('fs')
const { analyzeImageAndText } = require('../services/googleAIService')

exports.analyze = async (req, res) =>{
    try {
        const result = await analyzeImageAndText(req.file.path)
        res.json(result)
    }catch(error){
        console.log(error.message)
        res.status(500).json({error: 'Analysis failed'})
    }finally{
        fs.unlinkSync(req.file.path)
    }
}