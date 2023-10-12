//not use due to project scope
const jwt = require('jsonwebtoken')
const sessionRouter = require('express').Router()
const Session = require('../models/session')

sessionRouter.get('/',async(request,response)=> {
    const sessions = await Session.find({})
    response.status(200).json(sessions)
})

sessionRouter.post('/',async(request,response)=>{
    const newSession = new Session({
        players:null,
        tasks:request.body.tasksetId
    })
    const savedSession = await newSession.save()

    const savedSessionInDb = await Session.findOne(savedSession)
    //token should be the newSession's id
    const token = jwt.sign(savedSessionInDb.id,process.env.SECRET)

    

    response
        .status(201)
        .send({token,savedSession})
})

module.exports = sessionRouter