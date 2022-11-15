const express = require('express')
require('../db/mongoose')
const auth = require('../middleware/auth')
const tasks = require('../models/task')
const route = new express.Router()

// Tasks'routes

// Create task
route.post('/tasks', auth ,async( req , res)=>{
    const task = new tasks({
        ...req.body,
        owner: req.user._id
    })
    try{
        const uniqueDescription = await tasks.findOne({ description: req.body.description })
        if (uniqueDescription) {
            return res.send("This Description already used"); 
            }
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }  
    })

// Get all tasks 
// Get /tasks?completed=true
// Get /tasks?limit=2&skip=1
// Get /tasks?sortBy=createdAt:desc
route.get('/tasks', auth, async(req , res)=>{ 
    const match = {}
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortedBy){
        const parts = req.query.sortedBy.split(':')
        sort[parts[0]] = parts[1]=== 'desc'? -1 : 1
    }
    try{
        await req.user.populate({
            path :'tasks' , 
            match,
            options:{
                limit :parseInt(req.query.limit) ,
                skip :parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks)
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

// Get task by id 
route.get('/tasks/:id', auth ,async(req,res)=>{
    const _id = req.params.id
    try{
        taskById= await tasks.findOne({_id , owner : req.user._id })
        if(!taskById){
            return res.status(404).send()
        }
        res.send(taskById)
    }catch(e){
        res.status(500).send()
    }
})

// Update task
route.patch('/tasks/:id',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send('Error : invalid updates!')
    }
    try{
        const uniqueDescription = await tasks.findOne({ description: req.body.description })
        if (uniqueDescription) {
            return res.send("This Description already used"); 
            }
            const updatedTask =await tasks.findOne({_id : req.params.id , owner:req.user._id})
            if(!updatedTask){
                return res.status(404).send()
            }
            updates.forEach((update)=>updatedTask[update]= req.body[update])
            await updatedTask.save()
            res.send(updatedTask)
    }catch(e){
        res.status(400).send(e)
    }
})

//Delete task
route.delete('/tasks/:id',auth,async(req,res)=>{
    try{
        const deletedTask = await tasks.findOneAndDelete({_id : req.params.id , owner:req.user._id})
        if(!deletedTask){
            return res.status(404).send()
        }
        res.send(deletedTask)
    }catch(e){
        res.status(500).send()
    }
})
module.exports= route