const express = require('express')
const language = require('@google-cloud/language')
require('dotenv').config()

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

const keyFilename = process.env.API_KEY_PATH

// Google Vision Client
const client = new language.LanguageServiceClient({keyFilename})

app.post("/analyze-sentiment", (req, res)=>{
    const text = req.body.text
     if(!text){
        return res.status(400).json({error: "Text is required"})
    }
    
    client.analyzeSentiment({document: {content: text, type:'PLAIN_TEXT'}}).then((response)=>{
        console.log(response)
         res.json({
            score: response[0].documentSentiment.score,
            magnitude: response[0].documentSentiment.magnitude
         })
    }).catch((error)=>{
        console.log("Error: ", error.message)
        res.json({error: "Failed to analyze the text."})
    })
   
})

app.post("/analyze-entity", (req, res)=>{
    const text = req.body.text
     if(!text){
        return res.status(400).json({error: "Text is required"})
    }
    
    client.analyzeEntities({document: {content: text, type:'PLAIN_TEXT'}}).then((response)=>{
        console.log(response)
         res.json({entities: response[0].entities.map(entity =>({
            name: entity.name,
            type: entity.type,
            salience: entity.salience
         }))})
    }).catch((error)=>{
        console.log("Error: ", error.message)
        res.json({error: "Failed to analyze the text."})
    })
   
})

app.listen(PORT, ()=> console.log(`API Running at http://localhost:${PORT}`))