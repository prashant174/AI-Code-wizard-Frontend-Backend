import axios from 'axios';
import React, { useState } from 'react'
import "../Styled/adminPage.css"

const AdminPage = () => {
    const [questionData, setQuestionData] = useState({
        questionText: '',
        topic: 'Arrays',
        difficulty: 'Easy',
        testCases: [{ input: '', output: '' }],
        solutionCode: '',
        solutionExplanation: '',
        isSolved: false,
        isCorrect: false,
        timeComplexity: '',
        spaceComplexity: '',
        hints: [''],
        tags: [''],
        upvotes: 0,
        downvotes: 0
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setQuestionData({ ...questionData, [name]: value });
      };
    
      const handleTestCaseChange = (index, e) => {
        const { name, value } = e.target;
        const newTestCases = questionData.testCases.map((testCase, i) => {
          if (i === index) {
            return { ...testCase, [name]: value };
          }
          return testCase;
        });
        setQuestionData({ ...questionData, testCases: newTestCases });
      };
    
      const addTestCase = () => {
        setQuestionData({ ...questionData, testCases: [...questionData.testCases, { input: '', output: '' }] });
      };
    
      const removeTestCase = (index) => {
        const newTestCases = questionData.testCases.filter((_, i) => i !== index);
        setQuestionData({ ...questionData, testCases: newTestCases });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/addDsaQuestion', questionData)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('There was an error submitting the form!', error);
          });
      };




  return (
   <>
   <h1 id='adminTitle'> ADMIN PAGE</h1>
   <form onSubmit={handleSubmit} id='adminForm'>
      <div>
        <label>Question Text:</label>
        <textarea name="questionText" value={questionData.questionText} onChange={handleChange} required />
      </div>
      <div>
        <label>Topic:</label>
        <select name="topic" value={questionData.topic} onChange={handleChange} required>
          <option value="Arrays">Arrays</option>
          <option value="Strings">Strings</option>
          <option value="LinkedLists">LinkedLists</option>
          <option value="Stacks">Stacks</option>
          <option value="Queues">Queues</option>
          <option value="Trees">Trees</option>
          <option value="Graphs">Graphs</option>
          <option value="Hash Tables">Hash Tables</option>
          <option value="Sorting">Sorting</option>
          <option value="Searching">Searching</option>
          <option value="Recursion">Recursion</option>
          <option value="Dynamic Programming">Dynamic Programming</option>
        </select>
      </div>
      <div>
        <label>Difficulty:</label>
        <select name="difficulty" value={questionData.difficulty} onChange={handleChange} required>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div>
        <label>Test Cases:</label>
        {questionData.testCases.map((testCase, index) => (
          <div key={index}>
            <input
              type="text"
              name="input"
              value={testCase.input}
              onChange={(e) => handleTestCaseChange(index, e)}
              placeholder="Input"
              required
            />
            <input
              type="text"
              name="output"
              value={testCase.output}
              onChange={(e) => handleTestCaseChange(index, e)}
              placeholder="Output"
              required
            />
            <button type="button" onClick={() => removeTestCase(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addTestCase}>Add Test Case</button>
      </div>
      <div>
        <label>Solution Code:</label>
        <textarea name="solutionCode" value={questionData.solutionCode} onChange={handleChange} required />
      </div>
      <div>
        <label>Solution Explanation:</label>
        <textarea name="solutionExplanation" value={questionData.solutionExplanation} onChange={handleChange} />
      </div>
     
      <div>
        <label>Time Complexity:</label>
        <input type="text" name="timeComplexity" value={questionData.timeComplexity} onChange={handleChange} />
      </div>
      <div>
        <label>Space Complexity:</label>
        <input type="text" name="spaceComplexity" value={questionData.spaceComplexity} onChange={handleChange} />
      </div>
      <div>
        <label>Hints:</label>
        {questionData.hints.map((hint, index) => (
          <input
            key={index}
            type="text"
            value={hint}
            onChange={(e) => {
              const newHints = questionData.hints.map((h, i) => (i === index ? e.target.value : h));
              setQuestionData({ ...questionData, hints: newHints });
            }}
          />
        ))}
      </div>
      <div>
        <label>Tags:</label>
        {questionData.tags.map((tag, index) => (
          <input
            key={index}
            type="text"
            value={tag}
            onChange={(e) => {
              const newTags = questionData.tags.map((t, i) => (i === index ? e.target.value : t));
              setQuestionData({ ...questionData, tags: newTags });
            }}
          />
        ))}
      </div>
     
      <button type="submit">Submit</button>
    </form>
   </>
  )
}

export default AdminPage