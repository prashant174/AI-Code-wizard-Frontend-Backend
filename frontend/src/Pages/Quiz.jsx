import React, { useContext, useState } from 'react'
import Nav from '../Componants/Nav'
import { AuthContext } from '../context/Authcontext'
import { Link, useNavigate } from 'react-router-dom'
import QuizForm from '../Componants/QuizForm'
import QuizData from '../Componants/QuizData'
import { Box, Button, Container, Typography } from '@mui/material'
import { motion } from 'framer-motion';
import ParticleBackground from '../Componants/ParticleBackground'




const Quiz = () => {
  const {user}=useContext(AuthContext)

  const [questions,setQuestions]=useState([])
  // const [score, setScore] = useState(null);
  const [techStack, setTechStack] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const navigate=useNavigate()

 

 


  return (
    <>
   
     {user?(<>
      

               <Nav   />
             <ParticleBackground/>
               
             
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
               <Container >
               
                <Box my={4}  >
                <Button variant="contained" color="primary" onClick={() => navigate('/history')}>
        View History
      </Button>
                <QuizForm setQuestions={setQuestions} setTechStack={setTechStack} setDifficulty={setDifficulty} />
                <QuizData questions={questions} techStack={techStack} difficulty={difficulty} />
              
                </Box>
               </Container>
               
             
              
              </motion.div>
       
            
 
</>):(

  <Typography variant='h4' color="error" >Not Authorized please <Link to="/login" >login</Link> first</Typography>
 




)}

    </>
  )
}

export default Quiz