import { useState } from 'react'

const Button = ({ handleClick, text }) => (  
  <button onClick={handleClick}>    {text}  </button>
)

const Statistics = (props) => {
  const { good, neutral, bad, all } = props.stats
  //console.log(all)
  if(all === 0){
    return(
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  return(
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="all" value ={all} />
        <StatisticLine text="average" value ={(good+bad*-1)/all} />
        <StatisticLine text="positive" value ={100*good/all} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
  <tr><td>{props.text}</td><td>{props.value}</td></tr>
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