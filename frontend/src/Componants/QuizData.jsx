import { Box, Button, Card, CardContent, FormControlLabel, List, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import {Hourglass } from 'react-loader-spinner'



const QuizData = ({ questions, techStack, difficulty }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(null);
  const [loadingQuiz,setLoadingQuiz]=useState(false)

  const handleOptionChange = (questionId, option) => {
      setSelectedOptions(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    setLoadingQuiz(true)
      let correctAnswers = 0;
      for (const question of questions) {
          const response = await axios.post('https://codeconverter1.onrender.com/submitQuestion', {
              questionId: question._id,
              selectedOption: selectedOptions[question._id]
          }, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`
              }
          });

          if (response.data.isCorrect) correctAnswers++;
      }
      setScore(correctAnswers);
      setLoadingQuiz(false)
      toast('Quiz submited successfully')
  };

  if (!questions.length) return null;
  
    return (

      <>
       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" align="center" sx={{ mb: 4, color: 'rgba(45, 239, 145, 0.901)' }}>
          {`${difficulty} ${techStack} Quiz`}
        </Typography>
        <List>
          {questions.map((question, index) => (
            <Card key={index} sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <CardContent>
                <Typography variant="h6">{`Q${index + 1}: ${question.question}`}</Typography>
                <RadioGroup
                  value={selectedOptions[question._id] || ''}
                  onChange={(e) => handleOptionChange(question._id, e.target.value)}
                  
                >
                  {question.options.map((option, i) => (
                    <FormControlLabel key={i} value={option} control={<Radio />} label={option} />
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </List>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2, backgroundColor: 'rgba(45, 239, 145, 0.901)' }}
        >
         {loadingQuiz ? <Hourglass
  visible={loadingQuiz}
  height="17"
  width="80"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass=""
  colors={['white', 'white']}
  /> : 'SubmitQuiz'}
        </Button>
        {score !== null && (
          <Typography variant="h6" align="center" sx={{ mt: 4, color: 'rgba(45, 239, 145, 0.901)' }}>
           
            Your Score: {score}/{questions.length}
            
          </Typography>
        )}
      </Box>
   
       



    </motion.div>
      </>
    );
}

export default QuizData