const mongoose = require('mongoose')
const taskSchema = mongoose.Schema({
    description :{
        type : String,
        unique : true, 
        required : true,
        trim : true
    },
    completed : {
        type : Boolean,
        default:false
        
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref : 'Users'
    },
},{ timestamps: true })
const Task = mongoose.model('tasks', taskSchema)
module.exports = Task