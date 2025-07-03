
const fs=require('fs')
const { getAudioTranscript } = require('../services/openaiService')

exports.transcribe = async (req, res) =>{
    try {
        const transcript = await getAudioTranscript(req.file.path)
        res.json({transcript})
    }catch(error){
        console.log(error.message)
        res.status(500).json({error: 'Transcription failed'})
    }finally{
        fs.unlinkSync(req.file.path)
    }
}