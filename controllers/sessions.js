const jwt = require('jsonwebtoken')
const sessionRouter = require('express').Router()
const Session = require('../models/session')

sessionRouter.post('/',async(request,response)=>{
    
    const sessions = await Session.find({})
    const sessionsCount = sessions.length
    //token should be the newSession's id
    const token = jwt.sign(sessionsCount,process.env.SECRET)

    const newSession = new Session({
        players:null,
        tasks:request.body.tasksetId
    })

    response
        .status(201)
        .send({token})
})

module.exports = sessionRouter