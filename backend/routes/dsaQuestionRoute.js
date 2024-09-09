const express=require("express")
const { addDsaQuestion, getAllDsaQuestions, getDsaQuestionById } = require("../controllers/dsaQuestionController")
const { authenticate } = require("../middleware/authenticate")
const dsaQuestionRouter=express.Router()

dsaQuestionRouter.post("/addDsaQuestion",authenticate,addDsaQuestion)
dsaQuestionRouter.get("/getAllDsaQuestions",authenticate,getAllDsaQuestions)
dsaQuestionRouter.get("/getDsaQuestionById/:id",authenticate,getDsaQuestionById)

module.exports={
    dsaQuestionRouter
}