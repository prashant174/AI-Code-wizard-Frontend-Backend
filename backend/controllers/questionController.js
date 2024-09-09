const {GoogleGenerativeAI}=require('@google/generative-ai')
const { Questions, UserAttempts } = require('../Model/QuizModel')
require('dotenv').config()
const genAi=new GoogleGenerativeAI(process.env.API_KEY)

const model=genAi.getGenerativeModel({model:"gemini-pro"})

const generateQuiz=async(req,res)=>{
    try {
     const {techStack,difficulty}=req.body
     const {userId} = req.body
    

    //  console.log("frontend se aa rha hai", techStack,difficulty)

    const prompt=`Generate 10 multiple choice interview preparation questions for a ${difficulty} level ${techStack} developer. with correct option in JSON format correct option key shoulbe only correct`;
   
     const result = await model.generateContent(prompt);
     const response = await result.response;
     const text = response.text();

     const questionsData = text.split('\n')
    
   
     const jsonString = questionsData.join('\n').replace('```json', '').replace('```', '');

 
     const data = JSON.parse(jsonString);

     const questionData = data.questions;
     let type="MCQ"


     const questionDataToInserted=questionData.map(que=>({
        techStack,
        difficulty,
        type,
        question:que.question,
        options:que.options,
        correct: typeof que.correct === 'string' ? que.correct : que.options[parseInt(que.correct)],
        userId
     }))

  
//   console.log("questionsdata",questionData);
  const insertedData=await Questions.insertMany(questionDataToInserted)


     return res.status(200).send({msg:"Quiz created successfully",insertedData:insertedData})

    } catch (error) {
        return  res.status(500).send({msg:"Getting error while Generating Quizes"})
    }
}


const outputBasedQuestions=async(req,res)=>{
    
    try {
        const {techStack,difficulty}=req.body;

        const prompt=`Generate 10 ${difficulty} level output-based multiple choice questions  for ${techStack} developer interview preparation. with correct option in JSON format as a key name correct only everytime`

        const result = await model.generateContent(prompt);
     const response = await result.response;
     const text = response.text();

     const questionsData = text.split('\n')
    
   
     const jsonString = questionsData.join('\n').replace('```json', '').replace('```', '');

 
     const data = JSON.parse(jsonString);

     const questionData = data.questions;
     let type="Output-Based"

     const questionDataToInserted=questionData.map(que=>({
        techStack,
        difficulty,
        type,
        question:que.question,
        options:que.options,
        correct:que.correct
     }))

     console.log("questionsdata",questionData);

     const insertedData=await Questions.insertMany(questionDataToInserted)

     return res.status(200).send({msg:"Quiz created successfully",insertedData:insertedData})

    } catch (error) {
        return  res.status(500).send({msg:"Getting error while Generating Questions please try again later"})
    }
}

const deleteManydata=async(req,res)=>{
  const result = await Questions.deleteMany({});
  const result1=await UserAttempts.deleteMany({})
        console.log(`Deleted ${result.deletedCount} documents from the Questions collection.`);
        res.status(200).send({ msg: "All data deleted successfully", deletedCount: result.deletedCount,deletedCount1:result1 });
}


const getData=async(req,res)=>{
    const type="MCQ"
    const result=await Questions.find({type})
    console.log(`getData ${result} documents from the Questions collection.`);
        res.status(200).send({ msg: "All data deleted successfully", data: result,length:result.length });

}

const getQuestions = async (req, res) => {
    const { techStack, difficulty, type } = req.body;
  
    try {
      const questions = await Questions.find({ techStack, difficulty, type });
     return res.status(200).send({msg:"Quiz fetch successfully",questions:questions});
    } catch (error) {
        return  res.status(500).send({msg:"Getting error while Generating Questions please try again later"})
    }
  };

  const submitQuestion=async(req,res)=>{
    const { questionId, selectedOption, userId } = req.body;

    try {
        const question = await Questions.findById(questionId);

        if (!question) {
            return res.status(400).json({ msg: 'Question not found' });
        }

        const isCorrect = question.correct === selectedOption;

        const userAttempt = new UserAttempts({
            userId,
            questionId,
            selectedOption,
            isCorrect
        });

        await userAttempt.save();

        return res.status(200).send({ msg: "Answer submitted successfully", isCorrect });

    } catch (error) {
        return res.status(500).send({ msg: "Error submitting answer", error: error.message });
    }
  }

  const getUserHistory = async (req, res) => {
    const { userId } = req.params;

    try {
        const history = await UserAttempts.find({ userId }).populate('questionId');

        return res.status(200).send({ msg: "User history fetched successfully", history });

    } catch (error) {
        return res.status(500).send({ msg: "Error fetching user history", error: error.message });
    }
}

module.exports={
    generateQuiz,deleteManydata,outputBasedQuestions,getData,getQuestions,submitQuestion,getUserHistory
}





