//not use due to project scope
const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    players:[{
        type:String
    }]
})

playerSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Player',playerSchema)