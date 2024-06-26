import { useState } from 'react'

const Button = ({text, setter}) => {
  return (
    <button onClick={setter}>{text}</button>
  )
}

const StatisticLine = ({text, value, unit}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {unit}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const val_sum = good + neutral + bad
  if (val_sum == 0) {
    return <div>No feedback given</div>
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={val_sum} />
          <StatisticLine text="average" value={(good - bad) / val_sum} />
          <StatisticLine text="positive" value={good / val_sum * 100} unit="%" />
        </tbody>
      </table>
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