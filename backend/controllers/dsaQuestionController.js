const { DsaQuestionModel } = require("../Model/DSAQuizModel");


const addDsaQuestion=async(req,res)=>{
    try {
        const payload=req.body

        const newQuestion= new DsaQuestionModel(payload)
        await newQuestion.save()

        res.status(201).send({msg:"Question created successfully",question:newQuestion})

        
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

}

const getAllDsaQuestions=async(req,res)=>{
    try {
      const { topic, difficulty, page = 1, limit = 5 } = req.query;
      const query = {};
      if (topic) query.topic = topic;
      if (difficulty) query.difficulty = difficulty;
  
      const questions = await DsaQuestionModel.find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      const totalQuestions = await DsaQuestionModel.countDocuments(query);
  
      res.status(200).send({
        msg: 'Questions Fetched successfully',
        questions,
        totalQuestions,
        totalPages: Math.ceil(totalQuestions / limit),
        currentPage: Number(page),
      });
      } catch (error) {
        res.status(400).json({ msg: error.message });
      }
}


const getDsaQuestionById=async(req,res)=>{
    try {
        const question=await DsaQuestionModel.findById(req.params.id)
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
          }

          res.status(200).send({msg:"question fetched by id Successfully",question:question})
        
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


module.exports={
    addDsaQuestion,
    getAllDsaQuestions,
    getDsaQuestionById
}