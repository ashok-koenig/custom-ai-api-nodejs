
const fs=require('fs')
const { getAudioTranscript, getChatResponse } = require('../services/openaiService');
const { analyzeImageAndText } = require('../services/googleAIService');

exports.smartAssist = async (req, res) =>{
    const file = req.file;
    try {
        let output =''
        if(file.mimetype.startsWith('image/')){
            const analysis = await analyzeImageAndText(file.path);
            output = await getChatResponse(`Summarize this vision analysis: ${JSON.stringify(analysis)}`)
        }else if(file.mimetype.startsWith('audio/')){
            const transcript = await getAudioTranscript(file.path)
            output = await getChatResponse(`Summarize this audio transcript: ${transcript}`)
        }        
        res.json({summary: output})
    }catch(error){
        console.log(error.message)
        res.status(500).json({error: 'Smart assist failed'})
    }finally{
        fs.unlinkSync(req.file.path)
    }
}