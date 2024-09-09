const express=require("express")
const app=express()
require("dotenv").config()
const cors=require("cors")
const { connection } = require("./config/db");
const { authRouter } = require("./routes/authRoute");
const { codeRouter } = require("./routes/codeRoute");
const { questionsRouter } = require("./routes/quizRoutes");
const { ideRouter } = require("./routes/ideRoute");
const { dsaQuestionRouter } = require("./routes/dsaQuestionRoute");
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
  res.send("hello from codeconverter server side ")
})

app.use("/",authRouter)
app.use("/",codeRouter)
app.use("/",questionsRouter)
app.use("/",ideRouter)
app.use("/",dsaQuestionRouter)


const port=process.env.PORT||9000

app.listen(port,async()=>{
  try {
    await connection
    console.log("connected to mongoDB")
    console.log(`server is running on port ${port}`)
  } catch (error) {
    console.log(error.message)
  }
   
})