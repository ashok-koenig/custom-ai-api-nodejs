const express = require('express')
const axios = require('axios')
require('dotenv').config()

const app = express()
app.use(express.json())

const OPENAI_GPT_URL = process.env.OPENAI_GPT_URL
const OPENAI_DALL_E_URL = process.env.OPENAI_DALL_E_URL
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const PORT = process.env.PORT || 3000

app.post("/blog-summary", (req, res)=>{
    const content = req.body.content

    if(!content){
        return res.status(400).json({error: "Blog content required"})
    }

    axios.post(
        OPENAI_GPT_URL,
        {
            model: 'gpt-3.5-turbo',
            messages: [
                {role:"system", content: "You are a blog summarizer."},
                {role: "user", content: `Summarize this blog: ${content}`}
            ],
            temperature: 0.5
        },
        {
            headers:{
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                "Content-Type":'application/json'
            }
        }
    ).then((response)=>{
        const summary = response.data.choices[0].message.content
        res.json({summary})
    }).catch((error)=>{
        console.log('Error', error.message)
        res.status(500).json({error: "Failed to summarize blog."})
    })
})

app.post("/image-cover", (req, res)=>{
    const prompt = req.body.prompt

    if(!prompt){
        return res.status(400).json({error: "Prompt required"})
    }

    axios.post(
        OPENAI_DALL_E_URL,
        {
            prompt,
            n:1,
            size: '1024x1024',
            response_format:'url'
        },
        {
            headers:{
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                "Content-Type":'application/json'
            }
        }
    ).then((response)=>{
        const imageUrl = response.data.data[0].url
        res.json({imageUrl})
    }).catch((error)=>{
        console.log('Error', error.message)
        res.status(500).json({error: "Failed to generate image."})
    })
})

app.listen(PORT, ()=> console.log(`API Running at http://localhost:${PORT}`))