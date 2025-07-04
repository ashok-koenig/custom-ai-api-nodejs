const express = require('express')
require('dotenv').config()
const axios = require('axios')

const PORT = process.env.PORT || 3000
const OPENAI_API_URL = process.env.OPENAI_API_URL
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const app = express();
app.use(express.json())

app.post("/generate-image", (req, res)=>{
    const prompt = req.body.prompt;

    if(!prompt){
        return res.status(400).json({error: "Prompt is required"})
    }

    axios.post(
        OPENAI_API_URL,
        {
            prompt,
            n:1,
            size: "1024x1024",
            response_format:"url"
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            }
        }
    ).then((response)=>{
        console.log(response.data)
        const imageUrl = response.data.data[0].url
        res.json({imageUrl})
    }).catch(error =>{
        console.error("Error: ", error.message);
        res.status(500).json({error: "Failed to fetch GPT response."})
    })
})

app.listen(PORT, ()=> console.log(`API Server running at ${PORT}`))