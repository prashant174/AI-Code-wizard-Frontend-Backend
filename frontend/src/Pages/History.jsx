import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { Box, Button, Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';
import { AuthContext } from '../context/Authcontext';
import { Link, useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';

const History = () => {
    const [history,setHistory]=useState([])
    const [loading,setLoading]=useState(false)
    const {user}=useContext(AuthContext)
    const navigate=useNavigate()

    useEffect(() => {
        const fetchHistory = async () => {
          if (!user) return; 
    
          try {
            const userId = user.userId; // Correctly reference userId from user object
            const res = await axios.get(`https://codeconverter1.onrender.com/history/${userId}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            });
            setHistory(res.data.history);
            
            // console.log(res.data.history,"hiiiiiiissssstory")
          } catch (error) {
            console.error('Error fetching history:', error.message);
          }
        };
    
        fetchHistory();
      }, [user]); 


      const handleDelete=async()=>{
        try {
          setLoading(true)
          const res = await axios.delete(`https://codeconverter1.onrender.com/deleteAllData`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
          setHistory([])
           toast(res.data.msg)
          setLoading(false)
        } catch (error) {
          console.error('Error fetching history:', error.message);
          setLoading(false)
        }
      }

    
      if (!user) {
        return (
          <Typography variant='h4' color="error">
            Not Authorized, please <Link to="/login">login</Link> first
          </Typography>
        );
      }
    
      if (!history.length) {
        return (
            <>
             <Button variant="contained" color="primary" onClick={() => navigate('/quiz')}>
           Back to Quiz
         </Button>
          <Typography variant='h5' align='center' sx={{ mt: 4,color:"aqua" }}>
            No quiz history available.
          </Typography>
          
         </>
        );
      }
    


  return (
<>
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/quiz')}>
          Back to Quiz
        </Button>
        <LoadingButton sx={{marginLeft:"10px"}} loading={loading} variant="contained" color="error" onClick={handleDelete}  type="submit">Delete History</LoadingButton>
        <Typography variant="h5" align="center" sx={{ mb: 4, mt: 2, color: 'rgba(45, 239, 145, 0.901)' }}>
          Your Quiz History
        </Typography>
        <List>
          {history.map((attempt, index) => (
            <Card 
              key={index} 
              sx={{ 
                mb: 2, 
                backgroundColor: attempt.isCorrect ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)' 
              }}
            >
              <CardContent>
                {attempt.questionId ? (
                  <>
                    <Typography variant="h6">{`Question ${index + 1} : ${attempt.questionId.question}`}</Typography>
                    <List>
                      {attempt.questionId.options.map((option, i) => (
                        <ListItem key={i}>
                          <ListItemText primary={`${String.fromCharCode(65 + i)}. ${option}`} />
                        </ListItem>
                      ))}
                    </List>
                    <Typography variant="body2">
                      Your Answer: {attempt.selectedOption} - {attempt.isCorrect ? 'Correct' : 'Incorrect'}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="h6">{`Question ${index + 1} : Question data not available`}</Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </List>
      </Box>
    </motion.div>
</>
  )
}

export default History