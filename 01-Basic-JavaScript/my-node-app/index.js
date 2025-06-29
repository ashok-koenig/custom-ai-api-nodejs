const express = require("express")

const app = express()

app.get("/", (req, res)=>{
    res.send("First app using Express.js")
})

app.get("/about", (req, res)=>{
    res.send("This is About Page")
})

app.get("/contact", (req, res)=>{
    res.send("This is Contact Page")
})

app.listen(3000, ()=> console.log("API server is running at http://localhost:3000"))
