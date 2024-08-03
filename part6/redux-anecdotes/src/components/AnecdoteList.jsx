import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    console.log('state', state)
    if ( state.filter === '' ) {
      return state.anecdotes    
    } else {
      return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    }
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id))

    dispatch(setNotification(`you voted "${anecdote.content}"`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, "5000")
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList