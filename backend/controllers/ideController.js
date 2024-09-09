const {runCode}=require("../services/judgeServices")


const runCodeController=async(req,res)=>{
    const { code, language, testCases } = req.body;

    if (!testCases) {
      return res.status(400).json({ error: 'testCases is not defined' });
    }
  
    try {
      const results = [];
      for (const testCase of testCases) {
        if (!testCase.input) {
          return res.status(400).json({ error: 'input is not defined' });
        }
        const result = await runCode(code, language, testCase.input);
        const output = result.stdout ? result.stdout.trim() : result.stderr.trim();
        results.push({
          input: testCase.input,
          expectedOutput: testCase.output,
          actualOutput: output,
          passed: output === testCase.output,
          error: result.compile_output || result.stderr,
          status: result.status.description,
        });
      }
  
      const allPassed = results.every(result => result.passed);

        res.status(200).json({results:results, allPassed:allPassed});

    } catch (error) {
        res.status(500).json({ msg:"error while running code",error: error.message });
    }
}


const submitCodeController=async(req,res)=>{
    const { code, language, testCases } = req.body;

  if (!testCases) {
    return res.status(400).json({ error: 'testCases is not defined' });
  }

  try {
    const results = [];
    for (const testCase of testCases) {
      if (!testCase.input) {
        return res.status(400).json({ error: 'input is not defined' });
      }
      const result = await runCode(code, language, testCase.input);
      const output = result.stdout ? result.stdout.trim() : result.stderr.trim();
      results.push({
        input: testCase.input,
        expectedOutput: testCase.output,
        actualOutput: output,
        passed: output === testCase.output,
        error: result.compile_output || result.stderr,
        status: result.status.description,
      });
    }

    const allPassed = results.every(result => result.passed);

    if (allPassed) {
      // Logic to handle successful submission, e.g., save to database
    }

    res.json({ results, allPassed });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



module.exports={
    runCodeController,
    submitCodeController
}
