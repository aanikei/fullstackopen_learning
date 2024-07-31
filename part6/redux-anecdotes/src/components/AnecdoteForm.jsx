import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    console.log('event', event)
    const content = event.target[0].value
    event.target[0].value = ''
    dispatch(addAnecdote(content))
  }

  return (
    <form onSubmit={add}>
      <div><input /></div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm