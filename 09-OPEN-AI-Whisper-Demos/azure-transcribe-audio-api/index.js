const express = require('express')
const axios = require('axios')
const path=require('path')
const fs = require('fs')
const multer= require('multer')
const FormData = require('form-data')

require('dotenv').config()

const app = express()
app.use(express.json())

const OPENAI_WHISPER_URL = process.env.OPENAI_WHISPER_URL
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const PORT = process.env.PORT || 3000

// Set up storage to disk
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const uploadDisk = multer({
    storage,
    fileFilter: (req, file, cb) =>{
        const allowed = ["audio/mpeg", "audio/wav", "audio/x-wav", "audio/wave"]
        // console.log(file.mimetype)
        cb(null, allowed.includes(file.mimetype))
    }
})

app.post("/transcribe-audio", uploadDisk.single("audio"), (req, res)=>{
    if(!req.file){
        return res.status(400).json({error: "Audio file required."})
    }
    const filePath = path.resolve(req.file.path)
    const formData = new FormData()
    formData.append('file', fs.createReadStream(filePath))
    formData.append('model', 'whisper')

    axios.post(OPENAI_WHISPER_URL, formData, {
        headers:{
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            ...formData.getHeaders()
        }
    }).then((response)=>{
        // fs.unlinkSync(filePath)  // Remove the uploaded file
        res.json({transcription: response.data.text})
    }).catch((error)=>{
        console.log('Whisper Error: ', error.message)
        res.status(500).json({error: "Failed to transcribe audio."})
    })

})

app.listen(PORT, ()=> console.log(`API Running at http://localhost:${PORT}`))