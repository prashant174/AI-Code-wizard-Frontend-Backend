import axios from 'axios'

const API_URL = 'https://codeconverter1.onrender.com';

export const runCode = async (code, language, testCases) => {
  try {
    const response = await axios.post(`${API_URL}/runIDE`, { code, language, testCases },{
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
      }
  });
    return response.data;
  } catch (error) {
    console.error('Error running code:', error);
    throw error;
  }
};