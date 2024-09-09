import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CircularProgress, Typography, Container, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/system';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CodeIcon from '@mui/icons-material/Code';
import { AuthContext } from '../context/Authcontext';
import ParticleBackground from '../Componants/ParticleBackground';


const CustomButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1.5),
  borderRadius: '10px',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const TestCaseBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#2d2d2d',
  padding: theme.spacing(2),
  borderRadius: '8px',
  marginBottom: theme.spacing(2),
}));

const DsaQuestionDetailPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState();
  const [open, setOpen] = useState(false);
  const [aiHelp, setAiHelp] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  const {user}=useContext(AuthContext)

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`https://codeconverter1.onrender.com/getDsaQuestionById/${id}`,{
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
          }
      });
        setQuestion(response.data.question);
      } catch (error) {
        console.error('Error fetching question', error);
      }
    };

    fetchQuestion();
  }, [id]);
  
  const handleOpen = () => {
    setOpen(true);
    handleAIHelp();
  };

  const handleClose = () => {
    setOpen(false);
  };

  


  const handleAIHelp = async () => {
    setLoadingAI(true);
    try {
      const response = await axios.post('https://codeconverter1.onrender.com/getAIhelp', { 
        questionTitle: question.questionTitle, 
        questionText: question.questionText, 
        testCases: question.testCases 
      },{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
      setAiHelp(response.data.output);
    } catch (error) {
      console.error('Error getting AI assistance', error);
    } finally {
      setLoadingAI(false);
    }
  };
  
    if (!question) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <CircularProgress />
        </Box>
      );
    }

  return (
    <>
    
    {user?(
      <>
      <ParticleBackground/>
      <Container sx={{ backgroundColor: '#1c1c1c', color: '#fff', minHeight: '100vh', padding: 4, borderRadius: '8px' }}>
    <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
      <Typography variant="h4" gutterBottom>{question.questionTitle}</Typography>
      <Typography variant="subtitle1">Topic: {question.topic} | Difficulty: {question.difficulty}</Typography>
      <br />
      <br />
      <Typography variant="subtitle2"> {question.questionText}</Typography>
      <br />
      
      <Typography variant="subtitle2"> <b>Explaination</b> : {question.solutionExplanation}</Typography>
      <Typography variant="subtitle2"> <b>Hints</b> : {question.hints}</Typography>

    </Box>

    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h6" gutterBottom>Test Cases:</Typography>
      {question.testCases.map((testCase, index) => (
        <TestCaseBox key={index}>
          <Typography variant="body1">Input: {testCase.input}</Typography>
          <Typography variant="body1">Output: {testCase.output}</Typography>
        </TestCaseBox>
      ))}
    </Box>

    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
      <CustomButton variant="contained" color="primary" component={Link} to="/dsaQuestionsList" startIcon={<ArrowBackIcon />} sx={{ backgroundColor: '#007FFF' }}>
        Back to Questions List
      </CustomButton>
      <CustomButton variant="contained" color="secondary" onClick={handleOpen} startIcon={<HelpOutlineIcon />} sx={{ backgroundColor: '#FF4081' }}>
        AI Help Assistance
      </CustomButton>
      <CustomButton variant="contained" color="success" component={Link} to={`/IDE/${id}`} startIcon={<CodeIcon />} sx={{ backgroundColor: '#4CAF50' }}>
        Solve this question
      </CustomButton>
    </Box>

    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>AI Help Assistance</DialogTitle>
      <DialogContent>
        {loadingAI ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Typography variant="body1" gutterBottom>{aiHelp}</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  </Container>
      
      </>
    ):(
      <Typography variant='h4' color="error" >Not Authorized please <Link to="/login" >login</Link> first</Typography>
    )}

</>
  )
}

export default DsaQuestionDetailPage