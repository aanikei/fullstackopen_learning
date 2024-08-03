import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()
    console.log('event', event)
    const content = event.target[0].value
    event.target[0].value = ''
    const newAnecdote = await anecdoteService.createNew({ content, votes: 0 })
    dispatch(addAnecdote(newAnecdote))

    dispatch(setNotification(`you created "${content}"`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, "5000")
    
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm