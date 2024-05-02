import { useState } from 'react'

const Button = ({text, setter}) => {
  return (
    <button onClick={setter}>{text}</button>
  )
}

const Statistics = ({text, value}) => {
  return (
    <div>{text} {value}</div>
  )
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
      <Statistics text="good" value={good} />
      <Statistics text="neutral" value={neutral} />
      <Statistics text="bad" value={bad} />
    </div>
  )
}

export default App