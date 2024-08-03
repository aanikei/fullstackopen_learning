import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

//const getId = () => (100000 * Math.random()).toFixed(0)

const compareVotes = (a, b) => b.votes - a.votes

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
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

export const initializeAnecdotes = () => {  
  return async dispatch => {    
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes.sort(compareVotes)))  
  }
}

export const createAnecdote = (content) => {  
  return async dispatch => {    
    const newAnecdote = await anecdoteService.createNew({ content, votes: 0 })
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {  
  return async dispatch => {    
    dispatch(addVote(anecdote.id))
    await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 }) 
  }
}

export default anecdoteSlice.reducer