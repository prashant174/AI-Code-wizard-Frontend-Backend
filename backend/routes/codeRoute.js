const express=require("express")
const { languageConvert, qualityCheck, debug, getAIHelp } = require("../controllers/codeConverterConverter")
const { authenticate } = require("../middleware/authenticate")
const codeRouter=express.Router()

codeRouter.post("/convert",authenticate,languageConvert)
codeRouter.post("/quality",authenticate,qualityCheck)
codeRouter.post("/debug",authenticate,debug)
codeRouter.post("/getAIhelp",authenticate,getAIHelp)

module.exports={codeRouter}