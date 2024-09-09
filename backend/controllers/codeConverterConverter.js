const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config()
const genAI = new GoogleGenerativeAI(process.env.API_KEY);


const model = genAI.getGenerativeModel({ model: "gemini-pro"});



const languageConvert=async(req,res)=>{
    try {
        const {targetLanguage,inputCode}=req.body;

        const prompt = `Convert this code to ${targetLanguage}: ${inputCode}`

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // console.log(typeof(text));

       return res.status(200).send({msg:"Language converted successfully", output:text})
    } catch (error) {
      return  res.status(500).send({msg:"Getting error while converting the code language"})
    }
}


const qualityCheck=async(req,res)=>{
    try {
        const {inputCode}=req.body;

        const prompt=`Check the quality of this code: ${inputCode}`

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // console.log(typeof(text));

       return res.status(200).send({msg:"Code quality check successfully", output:text})
    } catch (error) {
        return  res.status(500).send({msg:"Getting error while checking quality of code"})
    }
}

const debug=async(req,res)=>{
    try {
        const {inputCode}=req.body;

        const prompt=`Debug this code: ${inputCode}`

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // console.log(typeof(text));

       return res.status(200).send({msg:"Code debug successfully", output:text})
    } catch (error) {
        return  res.status(500).send({msg:"Getting error while debuging code"})
    }
}

const getAIHelp = async (req, res) => {
    try {
        const { questionTitle, questionText, testCases } = req.body;
    
        const prompt = `Provide a detailed solution approach, time complexity, space complexity, and hints for the following coding problem:\n
        Title: ${questionTitle}\n
        Problem: ${questionText}\n
        Test Cases: ${JSON.stringify(testCases)}\n`;
    
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
    
        return res.status(200).send({ output: text });
      } catch (error) {
        return res.status(500).send({ msg: "Error getting AI assistance", error });
      }
};


module.exports={
    languageConvert,
    qualityCheck,
    debug,
    getAIHelp
}