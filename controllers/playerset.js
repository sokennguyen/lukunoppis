//not use due to project scope
const playersetRouter = require('express').Router()
const Player = require('../models/player')

playersetRouter.get('/',async(req,res)=>{
    const playersets = await Player.get({})
    res.status(200).json(playersets)
})

playersetRouter.post('/',)