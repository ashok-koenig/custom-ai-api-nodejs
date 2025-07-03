const express= require('express')
const multer = require('multer')
const axios = require('axios')
const path=require('path')
const cors=require('cors')
const fs = require('fs')
const FormData = require('form-data')
require('dotenv').config()

const PORT = process.env.PORT || 3000
const OPENAI_GPT_URL=process.env.OPENAI_GPT_URL
const OPENAI_WHISPER_URL=process.env.OPENAI_WHISPER_URL
const OPENAI_GPT_API_KEY=process.env.OPENAI_GPT_API_KEY
const OPENAI_WHISPER_API_KEY=process.env.OPENAI_WHISPER_API_KEY

const app=express()
app.use(cors())

const storage = multer.diskStorage({
    destination: (req, file, cb)=> cb(null, "uploads/"),
    filename: (req, file, cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const uplodDisk = multer({
    storage,
    fileFilter: (req, file, cb) =>{
        const allowed = ["audio/mpeg", "audio/wav", "audio/wave"]
        cb(null, allowed.includes(file.mimetype))
    }
})

// /smart-report: audio -> Whisper -> GPT summary

app.post("/smart-report", uplodDisk.single("audio"), (req, res)=>{
    if(!req.file){
        return res.status(400).json({error: "Audio file is required"})
    }

    const filePath = path.resolve(req.file.path)
    const formData = new FormData()
    formData.append("file", fs.createReadStream(filePath))
    formData.append("model", "whisper-1")

    // Step 1: Transcription using Whisper
    axios.post(OPENAI_WHISPER_URL, formData, {
        headers: {
            Authorization: `Bearer ${OPENAI_WHISPER_API_KEY}`,
            ...formData.getHeaders()
        }
    }).then((whisperRes)=>{
        const transcription = whisperRes.data.text;

        // Step 2: Summarization using GPT
        axios.post(OPENAI_GPT_URL, {
            model:"gpt-3.5-turbo",
            messages: [
                {role: "system", content: "You are an assistant that summarizes meeting notes or audio transcriptions"},
                {role: "user", content: `Summarize this transcript: ${transcription}`}
            ]
            },
            {
                headers: {Authorization: `Bearer ${OPENAI_GPT_API_KEY}`}
            }
        ).then((chatRes)=>{
            const summary = chatRes.data.choices[0].message.content
            fs.unlinkSync(filePath)
            res.json({transcription, summary})
        })
    }).catch(error=>{
        console.log("Error: ", error.message)
        res.status(500).json({error: "Failed to process smart report."})
    })
})

app.listen(PORT, ()=> console.log(`Smart Report API Running at http://localhost:${PORT}`))