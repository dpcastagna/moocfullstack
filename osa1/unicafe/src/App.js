import { useState } from 'react'

const Button = ({ handleClick, text }) => (  
  <button onClick={handleClick}>    {text}  </button>
)

const Statistics = (props) => {
  //console.log(props.stats.good)
  return(
    <div>
      <h1>statistics</h1>
      good {props.stats.good} <br />
      neutral {props.stats.neutral} <br />
      bad {props.stats.bad} <br />
      all {props.stats.all} <br />
      average {(props.stats.good+props.stats.bad*-1)/props.stats.all} <br />
      positive {100*props.stats.good/props.stats.all} %<br />
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {    
    //setAll(allClicks.concat('G'))    
    setGood(good + 1)  
    setAll(all + 1)
  }

  const handleNeutral = () => {    
    //setAll(allClicks.concat('N'))    
    setNeutral(neutral + 1)  
    setAll(all + 1)
  }

  const handleBad = () => {    
    //setAll(allClicks.concat('B'))    
    setBad(bad + 1)  
    setAll(all + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Statistics stats={{
        "good":good, 
        "neutral":neutral, 
        "bad":bad,
        "all":all,}} />
    </div>
  )
}

export default App