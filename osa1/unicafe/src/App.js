import { useState } from 'react'

const Button = ({ handleClick, text }) => (  
  <button onClick={handleClick}>    {text}  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {    
    //setAll(allClicks.concat('G'))    
    setGood(good + 1)  
  }

  const handleNeutral = () => {    
    //setAll(allClicks.concat('N'))    
    setNeutral(neutral + 1)  
  }

  const handleBad = () => {    
    //setAll(allClicks.concat('B'))    
    setBad(bad + 1)  
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <h1>statistics</h1>
      good {good} <br />
      neutral {neutral} <br />
      bad {bad} <br />
    </div>
  )
}

export default App