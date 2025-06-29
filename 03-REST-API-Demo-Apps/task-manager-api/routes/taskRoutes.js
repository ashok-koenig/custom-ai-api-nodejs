const express = require('express');
const AppError = require('../utils/AppError');

const taskRoutes = express.Router();

let tasks = [
    {id: 1, title: "Task 1"}
]

taskRoutes.get("/",(req, res)=>{
    res.json(tasks)
})

taskRoutes.get("/:id", (req, res, next)=>{
    const taskId = req.params.id
    const task = tasks.find((task)=> task.id == taskId)
    if(task){
        res.json(task)
    }else{
        return next(new AppError("Task not found", 404))
    }
})

taskRoutes.post("/", (req, res)=>{
    tasks.push(req.body)
    res.status(201).json(req.body)
})

taskRoutes.put("/:id", (req, res, next)=>{
    const taskId = req.params.id
    const task = tasks.find((task)=> task.id == taskId)
    if(task){
        tasks = tasks.filter((task)=> task.id != taskId)
        tasks.push(req.body)
        res.json(req.body)
    }else{
        return next(new AppError("Task not found", 404))
    }
})

taskRoutes.delete("/:id", (req, res, next)=>{
    const taskId = req.params.id
    const task = tasks.find((task)=> task.id == taskId)
    if(task){
        tasks = tasks.filter((task)=> task.id != taskId)
        res.sendStatus(204)
    }else{
        return next(new AppError("Task not found", 404))
    }
})



module.exports = taskRoutes