//not use due to project scope
const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    players:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Playerset'
    }],
    tasks:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Taskset'
    }
})

sessionSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Session',sessionSchema)