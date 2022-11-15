const express = require('express')
require('../db/mongoose')
const users = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const {sendWelcomEmail , sendDeleteEmail} = require('../emails/account')
const route = new express.Router()

// Users'routes

//Create user
route.post('/users',async( req , res)=>{
    const user = new users(req.body)
    try{
        const uniqueEmail = await users.findOne({ email: req.body.email })
        if (uniqueEmail) {
            return res.send("This email already used"); 
            }
            await user.save()
            sendWelcomEmail(user.email , user.name)
            const token = await user.generateAuthToken()
            res.status(201).send({user , token})
    }catch(e){
        res.status(400).send(e)
    }
})

//login 
route.post('/users/login',async(req,res)=>{
    try{
        const user = await users.findByCredentials(req.body.email , req.body.password)
        const token = await user.generateAuthToken()
        res.send({user , token })
    }catch(e){
        console.log(e)
        res.status(400).send()
    }
})

//logout
route.post('/users/logout',auth, async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()

    }
})

//logoutAll
route.post('/users/logoutAll',auth, async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()

    }
})

//Get user profile
route.get('/users/me',auth,async(req,res)=>{ 
    res.send(req.user)
})


//Update user
route.patch('/users/me',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send('Error : invalid updates!')
    }
    try{
        const uniqueEmail = await users.findOne({ email: req.body.email })
        if (uniqueEmail) {
        return res.send("This email already used"); 
        }
        updates.forEach((update)=> req.user[update]= req.body[update])
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }

})

//Delete user
route.delete('/users/me',auth,async(req,res)=>{
    try{
        sendDeleteEmail(req.user.email , req.user.name)
        await req.user.deleteOne();
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

// Upload Avatar 
const Upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req , file , cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an imagges '))
        }
        cb(undefined , true)
    }
})

route.post('/users/me/avatar',auth,Upload.single('avatar'),async(req , res)=>{
    const buffer = await sharp(req.file.buffer).resize({width : 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send('Picture is saved')
},(error , res , req , next)=>{
    res.status(400).send({error : error.message})
}) 

// Delete Avatar
route.delete('/users/me/avatar',auth,async(req , res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send('Avatar is deleted')
})

// Get profile picture
route.get('/users/:email/avatar',async(req,res)=>{
    try{
        const userAvatar = await users.findOne({email: req.params.email})
        if(!userAvatar || !userAvatar.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(userAvatar.avatar)
    }catch(e){
        res.status(404).send()
    }
})

module.exports= route
