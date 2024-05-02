import { useState } from 'react'

const Button = ({text, setter}) => {
  return (
    <button onClick={setter}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const val_sum = good + neutral + bad
  if (val_sum == 0) {
    return <div>No feedback given</div>
  } else {
    return (
      <>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>all {val_sum}</div>
        <div>average {val_sum == 0 ? 0 : (good - bad) / val_sum}</div>
        <div>positive {val_sum == 0 ? 0 : good / val_sum * 100} %</div>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" setter={() => setGood(good + 1)} />
      <Button text="neutral" setter={() => setNeutral(neutral + 1)} />
      <Button text="bad" setter={() => setBad(bad + 1)} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App