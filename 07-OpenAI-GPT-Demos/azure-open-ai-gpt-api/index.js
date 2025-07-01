const express = require('express')
require('dotenv').config()
const axios = require('axios')

const PORT = process.env.PORT || 3000
const OPENAI_API_URL = process.env.OPENAI_API_URL
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const app = express();
app.use(express.json())

app.post("/chat", (req, res)=>{
    const prompt = req.body.prompt;
    const tone = req.body.tone || "You are a helpful assisttant."

    if(!prompt){
        return res.status(400).json({error: "Prompt is required"})
    }

    axios.post(
        OPENAI_API_URL,
        {
            model: "gpt-35-turbo",
            messages: [
                {role: "system", content: tone},
                {role: "user", content: prompt}
            ]
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            }
        }
    ).then((response)=>{
        console.log(response.data)
        const gptReply = response.data.choices[0].message.content
        res.json({reply: gptReply})
    }).catch(error =>{
        console.error("Error: ", error.message);
        res.status(500).json({error: "Failed to fetch GPT response."})
    })
})

app.listen(PORT, ()=> console.log(`API Server running at ${PORT}`))