import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()
    console.log('event', event)
    const content = event.target[0].value
    event.target[0].value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`you created "${content}"`, 5))
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