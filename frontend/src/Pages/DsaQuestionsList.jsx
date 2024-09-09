import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { CircularProgress, List, ListItem, ListItemText, Typography, Container, Box, FormControl, InputLabel, Select, MenuItem, Button  } from '@mui/material';
import Nav from '../Componants/Nav';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ParticleBackground from '../Componants/ParticleBackground';
import { AuthContext } from '../context/Authcontext';

const DsaQuestionsList = () => {

  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useContext(AuthContext);

  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://codeconverter1.onrender.com/getAllDsaQuestions', {
          params: { topic, difficulty, page },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setQuestions(response.data.questions);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching questions', error);
        setError(error.message || 'An error occurred');
      }
    };

    fetchQuestions();
  }, [topic, difficulty, page]);
    

// console.log("question aya lya",questions)
  return (
    <>
    {user?(
      <>
      <Nav/>
    <ParticleBackground/>
    <Container sx={{ color: 'aqua', minHeight: '100vh', padding: 2 }}>
        <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
          <Typography variant="h4">DSA Questions</Typography>
        </Box>

        <Box sx={{ marginBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
          <FormControl variant="outlined" sx={{ minWidth: 120, color: '#fff' }}>
            <InputLabel sx={{ color: 'white' }}>Topic</InputLabel>
            <Select
            
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              label="Topic"
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
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Arrays">Arrays</MenuItem>
              <MenuItem value="Strings">Strings</MenuItem>
              <MenuItem value="LinkedLists">LinkedLists</MenuItem>
              <MenuItem value="Stacks">Stacks</MenuItem>
              <MenuItem value="Queues">Queues</MenuItem>
              <MenuItem value="Trees">Trees</MenuItem>
              <MenuItem value="Graphs">Graphs</MenuItem>
              <MenuItem value="Hash Tables">Hash Tables</MenuItem>
              <MenuItem value="Sorting">Sorting</MenuItem>
              <MenuItem value="Searching">Searching</MenuItem>
              <MenuItem value="Recursion">Recursion</MenuItem>
              <MenuItem value="Dynamic Programming">Dynamic Programming</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" sx={{ minWidth: 120, color: '#fff' }}>
            <InputLabel  sx={{ color: 'white' }}>Difficulty</InputLabel>
            <Select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              label="Difficulty"
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
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Easy">Easy</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Hard">Hard</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {error ? (
          <Typography color="error">{`Error: ${error}`}</Typography>
        ) : questions.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {questions.map((question) => (
              <ListItem
                key={question._id}
                button
                component={Link}
                to={`/dsaQuestionDetails/${question._id}`}
                sx={{
                  backgroundColor: '#333',
                  color: '#fff',
                  marginBottom: 1,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: question.difficulty === 'Easy' ? '#4caf50' :
                                      question.difficulty === 'Medium' ? '#ff9800' :
                                      question.difficulty === 'Hard' ? '#f44336' : '#444',
                  },
                }}
              >
                <ListItemText
                  primary={question.questionTitle}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="whitesmoke">
                        {question.difficulty} - {question.topic}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography component="span" variant="body2" color="whitesmoke">
                          Acceptance: {question.acceptance}%
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 1 }}>
                          {question.isSolved ? (
                            <CheckCircleIcon color="success" />
                          ) : (
                            <CancelIcon color="error" />
                          )}
                          {question.isCorrect ? (
                            <StarIcon color="primary" />
                          ) : (
                            <StarBorderIcon color="primary" />
                          )}
                        </Box>
                      </Box>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            sx={{ marginRight: 1 }}
          >
            Previous
          </Button>
          <Typography variant="body1" sx={{ alignSelf: 'center' }}>
            Page {page} of {totalPages}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            sx={{ marginLeft: 1 }}
          >
            Next
          </Button>
        </Box>
      </Container>
      </>
    ):(
      <Typography variant='h4' color="error" >Not Authorized please <Link to="/login" >login</Link> first</Typography>
    )}
    
  </>
  )
}

export default DsaQuestionsList