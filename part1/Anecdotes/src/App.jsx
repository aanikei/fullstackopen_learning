import { useState } from 'react'

const Popular = ({votes, anecdotes}) => {
  let max_value = 0
  let index = 0

  if (Object.keys(votes).length > 0) {
    for (const i in votes) {
      if (max_value < votes[i]) {
        max_value = votes[i]
        index = i
      }
    }
  }

  return (
    <div>
      <h2>Anecdote with most votes</h2>
      {anecdotes[index]}
      <div>has {max_value} votes</div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState([])
  //console.log(typeof(votes))

  const next_anecdote = (len) => {
    const rand_int = () => {
      setSelected(Math.floor(Math.random() * len))
    }
    return rand_int
  }

  const set_vote = (index) => {
    const rand_int = () => {
      
      const copy = { ...votes }
      if (copy[index] == undefined) {
        copy[index] = 1
      } else {
        copy[index] += 1
      }
      
      setVote(copy)
    }
    return rand_int
  }
  
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <div>has {votes[selected] == undefined ? 0 : votes[selected]} votes</div>
      <div>
        <button onClick={set_vote(selected)}>vote</button>
        <button onClick={next_anecdote(anecdotes.length)}>next anecdote</button>
      </div>
      <Popular votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App