const { allUsers, addUser, findUserById, updateUserById, deleteUserById } = require("../services/userService")


exports.getAllUsers = (req, res)=>{
    res.json(allUsers())
}

exports.createUser = (req, res)=>{    
    res.status(201).json(addUser(req.body))
}

exports.getUserById = (req, res)=>{    
    let userId = req.params.id
    const user = findUserById(userId)
    if(user){
        res.json(user)
    }else{
        res.status(404).json({error: "User not found"})
    }
}

exports.updateUser = (req, res)=>{
    let userId = req.params.id
    const user = findUserById(userId)
    if(user){
        res.json(updateUserById(userId, req.body))
    }else{
        res.status(404).json({error: "User not found"})
    }
}

exports.deleteUser = (req, res)=>{
    let userId = req.params.id
    const user = findUserById(userId)
    if(user){
        deleteUserById(userId) 
        res.sendStatus(204)
    }else{
        res.status(404).json({error: "User not found"})
    }
}