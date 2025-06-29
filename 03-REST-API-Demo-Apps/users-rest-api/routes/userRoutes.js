const express = require("express")
const userRoutes = express.Router()
// In-memory user data
let users = [
    {id:1, name: "John Smith"},
    {id: 2, name: "Peter"}
]
// Get All users
userRoutes.get("/", (req, res)=>{
    res.json(users)
})
// Create new user
userRoutes.post("/", (req, res)=>{
    // console.log(req.body)
    // res.send("User Created...")
    users.push(req.body)
    res.status(201).json(req.body)
})

// Get an user by id
userRoutes.get("/:id", (req, res)=>{
    // console.log(req.params)
    let userId = req.params.id
    const user = users.find(user => user.id == userId)
    if(user){
        res.json(user)
    }else{
        res.status(404).json({error: "User not found"})
    }
})

// Update an user
userRoutes.put("/:id", (req, res)=>{
    let userId = req.params.id
    const user = users.find(user => user.id == userId)
    if(user){
        users = users.filter((user)=> user.id != userId)
        users.push(req.body)
        res.json(req.body)
    }else{
        res.status(404).json({error: "User not found"})
    }
})

// Delete an user
userRoutes.delete("/:id", (req, res)=>{
    let userId = req.params.id
    const user = users.find(user => user.id == userId)
    if(user){
        users = users.filter((user)=> user.id != userId)        
        res.sendStatus(204)
    }else{
        res.status(404).json({error: "User not found"})
    }
})

module.exports = userRoutes