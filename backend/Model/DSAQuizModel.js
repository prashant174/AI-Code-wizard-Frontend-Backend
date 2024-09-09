const mongoose=require("mongoose");
const { type } = require("os");

const DsaQuestionSchema = new mongoose.Schema({
  questionTitle:{type:String,
    required:true
  },
  questionText: {
    type: String,
    required: true,
    trim: true
  },
  topic: {
    type: String,
    required: true,
    enum: ['Arrays', 'Strings', 'LinkedLists', 'Stacks', 'Queues', 'Trees', 'Graphs', 'Hash Tables', 'Sorting', 'Searching', 'Recursion', 'Dynamic Programming']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  },
  testCases: {
    type: [{
      input: {
        type: String,
        required: true
      },
      output: {
        type: String,
        required: true
      }
    }],
    required: true,
    validate: {
      validator: (value) => {
        try {
          JSON.parse(JSON.stringify(value));
          return true;
        } catch (error) {
          return false;
        }
      },
      message: 'testCases must be a valid JSON array of objects with "input" and "output" properties'
    }
  },
  solutionCode: {
    type: String,
    required: true
  },
  solutionExplanation: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isSolved: Boolean,
  isCorrect: Boolean,
  timeComplexity: {
    type: String
  },
  spaceComplexity: {
    type: String
  },
  hints: [{
    type: String
  }],
  tags: [{
    type: String
  }],
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  },
  acceptance: { type: Number, default: 0 } 
});


const DsaQuestionModel=mongoose.model("DsaQuestion",DsaQuestionSchema)

module.exports={
  DsaQuestionModel
}