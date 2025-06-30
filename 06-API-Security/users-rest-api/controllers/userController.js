const { ERROR_MESSAGE } = require("../constants/error-message")
const { STATUS_CODE } = require("../constants/status-code")
const { allUsers, addUser, findUserById, updateUserById, deleteUserById } = require("../services/userService")


exports.getAllUsers = (req, res)=>{
    res.json(allUsers())
}

exports.createUser = (req, res)=>{    
    res.status(STATUS_CODE.CREATED).json(addUser(req.body))
}

exports.getUserById = (req, res)=>{    
    let userId = req.params.id
    const user = findUserById(userId)
    if(user){
        res.json(user)
    }else{
        res.status(STATUS_CODE.NOT_FOUND).json({error: ERROR_MESSAGE.USER_NOT_FOUND})
    }
}

exports.updateUser = (req, res)=>{
    let userId = req.params.id
    const user = findUserById(userId)
    if(user){
        res.json(updateUserById(userId, req.body))
    }else{
        res.status(STATUS_CODE.NOT_FOUND).json({error: ERROR_MESSAGE.USER_NOT_FOUND})
    }
}

exports.deleteUser = (req, res)=>{
    let userId = req.params.id
    const user = findUserById(userId)
    if(user){
        deleteUserById(userId) 
        res.sendStatus(STATUS_CODE.NO_CONTENT)
    }else{
        res.status(STATUS_CODE.NOT_FOUND).json({error: ERROR_MESSAGE.USER_NOT_FOUND})
    }
}