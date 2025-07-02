const express = require('express')
const multer = require('multer')
const vision = require('@google-cloud/vision')
const path = require('path')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

const keyFilename = process.env.API_KEY_PATH

// Google Vision Client
const client = new vision.ImageAnnotatorClient({keyFilename})

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
        const allowed = ["image/png", "image/jpeg"]
        cb(null, allowed.includes(file.mimetype))
    }
})

app.post("/analyze", uploadDisk.single('file'), (req, res)=>{
     if(!req.file){
        return res.status(400).json({error: "File required or unsupported file format"})
    }
    const filePath = path.resolve(req.file.path)

    client.textDetection(filePath).then((response)=>{
         res.json({text: response[0].textAnnotations[0]?.description})
    }).catch((error)=>{
        console.log("Error: ", error.message)
        res.json({error: "Failed to analyze the image."})
    })
   
})

app.listen(PORT, ()=> console.log(`API Running at http://localhost:${PORT}`))