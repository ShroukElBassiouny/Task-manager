const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tasks = require('./task')
const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        trim : true
    },
    email :{
        type : String,
        required : true,
        trim : true,
        unique : true, 
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password : {
        type : String,
        required : true,
        minlength: 7,
        trim: true,
        //includes doesn't work
        Validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error('Password cannot contain Password ')
            }
        }
    },
    age : {
        type : Number,
        default : 0,
        Validate(value){
            if(value<0){
                throw new Error('Age must be postive number ')
            }
        }
    },
    tokens:[{
        token : {
            type : String,
            required : true
        }
    }],
    avatar :{
        type : Buffer
    }
}, { timestamps: true })
userSchema.virtual('tasks', {
    ref: 'tasks',
    localField: '_id',
    foreignField: 'owner'
})
userSchema.methods.toJSON = function(){
    const userObject = this.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.__v
    delete userObject.avatar
    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const token =jwt.sign({email: this.email},process.env.JWT_SECRET)
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
}
//Check email and password before logging
userSchema.statics.findByCredentials = async(email , password)=>{
    const user = await User.findOne({email})
    if (!user){
        throw new Error('User not found!')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Invalid Password')
    }
    return user
}
//Hash the plain text password before save
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
     next()
})
// Delete user tasks when user is removed
userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    const user = this;
    try{
     await tasks.deleteMany({ owner: user._id });
     next();
    }catch{
    }
 })
const User = mongoose.model('Users', userSchema)
module.exports = User