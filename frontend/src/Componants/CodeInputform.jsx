import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/Authcontext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton';
import { Editor } from '@monaco-editor/react'
import Split from 'react-split'
import ResultDisplay from "./ResultDisplay"
import "../Styled/codeInputForm.css"
import { Hourglass } from 'react-loader-spinner'

export const CodeInputform = () => {
  const { user } = useContext(AuthContext);
  const [inputCode, setInputCode] = useState('');
  const [type, setType] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputCode || !type || (type === 'convert' && !targetLanguage)) {
        alert('Please fill in all required fields.');
        return;
    }
    try {
        setLoading(true);
        let res;
        if (type === 'quality') {
            res = await axios.post('https://codeconverter1.onrender.com/quality', { inputCode }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
        } else if (type === "debug") {
            res = await axios.post('https://codeconverter1.onrender.com/debug', { inputCode }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
        } else if (type === 'convert') {
            res = await axios.post('https://codeconverter1.onrender.com/convert', { targetLanguage, inputCode }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
        }
        console.log(res);
        if (res && res.data) {
            setResult(res.data);
        } else {
            console.error('Unexpected response format:', res);
            alert('An unexpected error occurred. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please check the console for more details.');
    } finally {
        setLoading(false);
    }
};

if (!user) {
  navigate("/login");
  return null; // Return null to avoid rendering the component when navigating
}
      
  return (
  <>
   <div className="code-input-form-container">
            <Split className="split" sizes={[50, 50]} minSize={200} gutterSize={10}>
                <div className="editor-container">
                    <Editor
                        height="100vh"
                        defaultLanguage="javascript"
                         defaultValue="// write your code here..."
                        theme='vs-dark'
                        value={inputCode}
                        onChange={(value) => setInputCode(value)}
                    />
                </div>
                <div className="form-container">
                    <FormControl fullWidth margin='normal'>
                        <InputLabel sx={{ color: 'white' }}>Type</InputLabel>
                        <Select label='type' value={type} onChange={(e) => setType(e.target.value)} 
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
                            <MenuItem value='convert'>Convert</MenuItem>
                            <MenuItem value='quality'>Quality Check</MenuItem>
                            <MenuItem value='debug'>Debug</MenuItem>
                        </Select>
                    </FormControl>
                    {type === 'convert' && (
                        <FormControl fullWidth margin='normal'>
                            <InputLabel sx={{ color: 'white' }}>Target Language</InputLabel>
                            <Select label='Target language' value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}
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
                                <MenuItem value="C++">C++</MenuItem>
                                <MenuItem value="Java">Java</MenuItem>
                                <MenuItem value="Python">Python</MenuItem>
                                <MenuItem value="JavaScript">JavaScript</MenuItem>
                                <MenuItem value="C#">C#</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                    <LoadingButton loading={loading} variant="contained"  onClick={handleSubmit} sx={{ mt: 2, backgroundColor: 'rgba(45, 239, 145, 0.901)' }} >
                    {loading ? <Hourglass
  visible={loading}
  height="17"
  width="80"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass=""
  colors={['white', 'white']}
  /> : 'Submit'} 
                    </LoadingButton>

                    <h1 style={{color:"aqua"}} >Result</h1>
                    {result && <ResultDisplay result={result} />}
                </div>
            </Split>
        </div>
  
  </>
  )
}
