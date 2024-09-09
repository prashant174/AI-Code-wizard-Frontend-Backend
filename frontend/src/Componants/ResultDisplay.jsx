import React from 'react'

const ResultDisplay = ({result}) => {
  return (
    <>
    <div id='resultDisplay'>
    <pre>{result.output}</pre>
    </div>
   
    </>
  )
}

export default ResultDisplay