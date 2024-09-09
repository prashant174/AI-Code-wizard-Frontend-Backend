const mongoose=require('mongoose')

const QuestionSchema=new mongoose.Schema({
  techStack: String,
  difficulty: String,
  type: String,
  question: String,
  options: [String],
  correct: String,
  userId: {
      type: String, required: true
  }


})


const UserAttemptSchema = new mongoose.Schema({
  userId: {
      type: String,
      required: true
  },
  questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
  },
  selectedOption: String,
  isCorrect: Boolean,
  timestamp: {
      type: Date,
      default: Date.now
  }
});

const Questions=mongoose.model('Question',QuestionSchema)
const UserAttempts = mongoose.model('UserAttempt', UserAttemptSchema);

module.exports={
    Questions,UserAttempts
}