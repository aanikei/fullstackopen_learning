import { createSlice, current } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const compareVotes = (a, b) => b.votes - a.votes

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      const newAnecdote = {
        content: action.payload,
        votes: 0,
        id: getId()
      }
      state.push(newAnecdote)
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(n => n.id === id)
      console.log("addVote state", current(state))
      const votedAnecdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote 
      ).sort(compareVotes)
    },
    setAnecdotes(state, action) {      
      return action.payload    
    }
  }
})

export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer