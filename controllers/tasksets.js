const tasksetRouter = require('express').Router()
const Taskset= require('../models/taskset')

tasksetRouter.post('/',async(req,res)=> {
    const body = req.body

    const taskset = new Taskset({
        tasks:body.tasks        
    })

    const savedTaskset = await taskset.save()
    res.status(201).json(savedTaskset)
})

module.exports=tasksetRouter