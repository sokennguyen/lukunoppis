const mongoose = require('mongoose')

const tasksetSchema = new mongoose.Schema({
    tasks:[{
        type:String
    }]
})

tasksetSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Taskset',tasksetSchema)