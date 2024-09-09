import React, { useContext,  useEffect,  useState } from 'react'
import Nav from '../Componants/Nav'
import { AuthContext } from '../context/Authcontext';
import { Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { runCode } from '../services/JudgeService';
import Editor from '@monaco-editor/react';
import Split from 'react-split'
import "./IDE.css"
import { Hourglass } from 'react-loader-spinner';
import axios from 'axios';

const IDE = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [question, setQuestion] = useState(null);
  const [results, setResults] = useState([]);
  const { id } = useParams();
  const { user } = useContext(AuthContext);


  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`https://codeconverter1.onrender.com/getDsaQuestionById/${id}`,{
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
          }
      });
        setQuestion(response.data.question);
        setCode(getBoilerplateCode(language, response.data.question));
      } catch (error) {
        console.error('Error fetching question', error);
      }
    };

    fetchQuestion();
  }, [id, language]);

  useEffect(() => {
    // Save code to local storage whenever it changes
    localStorage.setItem(`code-${id}`, code);
  }, [code, id]);

  const getBoilerplateCode = (language, question) => {
    if (!question) return '';

    const input = question?.testCases[0]?.input ? question.testCases[0].input : '[]';

    switch (language) {
      case 'javascript':
        return `function main(input) {
  // Write your code here
  // input: ${JSON.stringify(input)}
  return '';
}

// Example usage
const input = ${input};
console.log(main(input));
`;
      case 'python':
        return `def main(input):
    # Write your code here
    # input: ${input}
    return ''

# Example usage
input = ${JSON.stringify(input)}
print(main(input))
`;
      case 'java':
        return `import java.util.*;

public class Main {
  public static void main(String[] args) {
    // Example usage
    List<Object> input = Arrays.asList(${input.map(item => {
        if (typeof item === 'string') return `"${item}"`;
        if (Array.isArray(item)) return `Arrays.asList(${item.map(subItem => (typeof subItem === 'string' ? `"${subItem}"` : subItem)).join(', ')})`;
        return item;
      }).join(', ')});
    System.out.println(main(input));
  }

  public static String main(List<Object> input) {
    // Write your code here
    // input: ${input}
    return "";
  }
}
`;
      default:
        return '';
    }
  };

  const handleRunCode = async () => {
    try {
      setLoading(true);
      const result = await runCode(code, language, question.testCases);
      if (result.results) {
        setResults(result.results);
        setOutput(result.allPassed ? 'All test cases passed!' : 'Some test cases failed.');
      } else {
        throw new Error('Unexpected result format');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error running code', error);
      setOutput('Error running code');
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      const response = await axios.post('https://codeconverter1.onrender.com/submitIDE', {
        code,
        language,
        testCases: question.testCases,
      },{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
      setResults(response.data.results);
      setOutput(response.data.allPassed ? 'All test cases passed! Submission successful.' : 'Some test cases failed. Submission unsuccessful.');
      setSubmitLoading(false);
    } catch (error) {
      setOutput('Error submitting code');
      setSubmitLoading(false);
    }
  };





  return (
    <>
    {user?(
        <>
         <Nav/>
        
         <div className="ide-container">
            <Split className="split" sizes={[30, 70]} minSize={200} gutterSize={10}>
              <div className="problem-section">
                {!question ? (
                  <>
                    <p>Loading....</p>
                  </>
                ) : (
                  <>
                  <h2>{question.questionTitle}</h2>
                    <p>
                      <b>Topic:-</b> {question.topic} | <b>Difficulty:-</b> {question.difficulty}
                    </p>
                    <p>{question.questionText}</p>
                    <br />
                    <h3>Explanation</h3>
                    <p>{question.solutionExplanation}</p>
                    <h3>Input</h3>
                    {question.testCases.map((example, index) => (
                      <div key={index}>
                        <pre>
                          Input: {example.input} <br />
                          Output: {example.output}
                        </pre>
                      </div>
                    ))}
                    <h3>Hints</h3>
                    <p>{question.hints}</p>
                  </>
                )}
              </div>
              <div className="ide-section">
                <Split className="split-vertical" sizes={[70, 30]} minSize={100} gutterSize={10} direction="vertical">
                  <div className="editor-container">
                    <select className="language-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                    </select>
                    <Editor
                      height="calc(100% - 40px)"
                      defaultLanguage={language}
                      theme="vs-dark"
                      value={code}
                      onChange={(value) => setCode(value)}
                    />
                  </div>
                  <div className="output-container">
                    <div className="output-header">
                      <button
                        style={{ borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }}
                        onClick={handleRunCode}
                        disabled={loading || submitLoading}
                      >
                        {loading ? (
                          <Hourglass
                            visible={loading}
                            height="17"
                            width="80"
                            ariaLabel="hourglass-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            colors={['white', 'white']}
                          />
                        ) : (
                          'Run Code'
                        )}
                      </button>
                      <button
                        style={{ borderRadius: '5px', cursor: 'pointer', backgroundColor: 'green' }}
                        onClick={handleSubmit}
                        disabled={loading || submitLoading}
                      >
                        {submitLoading ? (
                          <Hourglass
                            visible={submitLoading}
                            height="17"
                            width="80"
                            ariaLabel="hourglass-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            colors={['white', 'white']}
                          />
                        ) : (
                          'Submit'
                        )}
                      </button>
                    </div>
                    <h3>Output:-</h3>
                    <div>
                     <pre>
                     {results.length > 0 ? (
                        results.map((result, index) => (
                          <div key={index} style={{ color: result.passed ? 'green' : 'red' }}>
                            <h4>Test Case {index + 1}:</h4>
                            <pre>Input: {result.input}</pre>
                            <pre>Expected Output: {result.expectedOutput}</pre>
                            <pre>Actual Output: {result.actualOutput}</pre>
                            <pre>Passed: {result.passed ? 'Yes' : 'No'}</pre>
                            {result.error && (
                              <>
                                <pre>Error: {result.error}</pre>
                                <pre>Status: {result.status}</pre>
                              </>
                            )}
                          </div>
                        ))
                      ) : (
                        <p>No results to display</p>
                      )}
                     </pre>
                    </div>
                  </div>
                </Split>
              </div>
            </Split>
          </div>
    
        </>
    ):(
        <Typography variant='h4' color="error" >Not Authorized please <Link to="/login" >login</Link> first</Typography>
    )
}
   
    </>
   
  )
}

export default IDE
