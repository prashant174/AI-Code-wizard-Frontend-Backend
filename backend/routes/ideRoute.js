const express=require('express')
const { runCodeController, submitCodeController } = require('../controllers/ideController')
const { authenticate } = require('../middleware/authenticate')
const ideRouter=express.Router()

ideRouter.post("/runIDE",authenticate,runCodeController)
ideRouter.post("/submitIDE",authenticate,submitCodeController)

module.exports={ideRouter}