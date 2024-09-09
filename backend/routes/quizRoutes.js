const express=require('express')
const { generateQuiz, deleteManydata, outputBasedQuestions, getData, getQuestions, submitQuestion, getUserHistory } = require('../controllers/questionController')
const { authenticate } = require('../middleware/authenticate')
// const { generateQuiz } = require('../controllers/questionController')
const questionsRouter=express.Router()

questionsRouter.post("/genrateQuiz",authenticate,generateQuiz)
questionsRouter.delete("/deleteAllData",authenticate,deleteManydata)
questionsRouter.post("/outputBasedQuestions",authenticate,outputBasedQuestions)
questionsRouter.get("/getData",authenticate,getData)
questionsRouter.post("/getQuiz",authenticate,getQuestions)
questionsRouter.post("/submitQuestion",authenticate,submitQuestion)
questionsRouter.get("/history/:userId",authenticate,getUserHistory)

module.exports={
    questionsRouter
}