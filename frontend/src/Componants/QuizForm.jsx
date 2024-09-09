import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Hourglass } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const QuizForm = ({ setQuestions, setTechStack, setDifficulty }) => {
  const [techStack, setTechStackLocal] = useState('');
  const [difficulty, setDifficultyLocal] = useState('');
  const [loading,setLoading]=useState(false)
    const {user}=useContext(AuthContext)
    const navigate=useNavigate()


    const generateQuestions =async()=>{

try {
  setLoading(true)
    const res= await axios.post('https://codeconverter1.onrender.com/genrateQuiz',{techStack,difficulty,userId:user.id},{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
       })

       console.log(res.data)
       setQuestions(res.data.insertedData)
       setTechStack(techStack);
      setDifficulty(difficulty);
      toast(res.data.msg)
      setLoading(false)
} catch (error) {
    console.log('Error found',error.message)
    setLoading(false)
}
    }


if(!user){
navigate("/")
}
  return (

    <>
     <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
    <Box component="form" noValidate autoComplete="off" sx={{ mt: 3, p: 4, borderRadius: 2, boxShadow: '0px 0px 20px rgba(45, 239, 145, 0.901)' }}  >
    <Typography variant="h5" align="center" gutterBottom sx={{color:'rgba(45, 239, 145, 0.901)'}}>
          Generate Your Quiz
        </Typography>
    <TextField

        label="Tech Stack"
        fullWidth
        value={techStack}
        onChange={(e) => setTechStackLocal(e.target.value)}
        InputProps={{
          style: { color: 'white' } 
        }}
        InputLabelProps={{
          style: { color: 'white' } 
        }}
        sx={{ mt: 2,background:'rgba(210, 219, 210, 0.078)', borderRadius:'2px' }}
       
      />
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel sx={{ color: 'white' }}>Difficulty</InputLabel>
        <Select label='Difficulty'
          value={difficulty}
          onChange={(e) => setDifficultyLocal(e.target.value)}
          sx={{ color: 'white', backgroundColor: 'rgba(210, 219, 210, 0.078)', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'none' } }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: '#333',
                '& .MuiMenuItem-root': {
                  color: 'white'
                },
                '& .MuiMenuItem-root.Mui-selected': {
                  backgroundColor: '#444',
                },
                '& .MuiMenuItem-root:hover': {
                  backgroundColor: '#555',
                }
              }
            }
          }}
        >
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>
      </FormControl>
      <Box textAlign="center" mt={4}>
        <Button variant="contained" color="primary" disabled={loading} onClick={generateQuestions} sx={{ mt: 2, backgroundColor: 'rgba(45, 239, 145, 0.901)' }} >
        {loading ? <Hourglass
  visible={loading}
  height="17"
  width="80"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass=""
  colors={['white', 'white']}
  /> : 'Generate Questions'}  
        </Button>
      </Box>
    </Box>
    </motion.div>
    </>

  )
}

export default QuizForm