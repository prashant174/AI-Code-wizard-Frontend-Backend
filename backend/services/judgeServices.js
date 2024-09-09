const axios = require('axios');
require('dotenv').config()


const runCode = async (code, language, input) => {
  const languageMap = {
    javascript: 63,
    python: 71,
    java: 62,
  };

  const languageId = languageMap[language];
  if (!languageId) {
    throw new Error('Unsupported language');
  }

  const options = {
    method: 'POST',
    url: process.env.JUDGE0_API_URL,
    params: { base64_encoded: 'false', fields: '*' },
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': process.env.RAPIDAPI_HOST,
    },
    data: {
      source_code: code,
      language_id: languageId,
      stdin: input,
    },
  };

  try {
    const response = await axios.request(options);
    const { token } = response.data;

    // Fetch the results using the token
    const resultOptions = {
      method: 'GET',
      url: `${process.env.JUDGE0_API_URL}/${token}`,
      params: { base64_encoded: 'false', fields: '*' },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': process.env.RAPIDAPI_HOST,
      },
    };

    let resultResponse;
    let status = 'In Queue';

    // Poll the API until the status is not "In Queue" or "Processing"
    do {
      resultResponse = await axios.request(resultOptions);
      status = resultResponse.data.status.description;
      if (status === 'In Queue' || status === 'Processing') {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } while (status === 'In Queue' || status === 'Processing');

    return resultResponse.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

module.exports = { runCode };
