import { createAnecdote } from '../requests'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import NotificationContext from '../notificationContext'
import { useContext } from 'react'

const AnecdoteForm = () => {
  const [counter, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => {      
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {    
      const responseError = error.response.data.error
      console.log("responseError", responseError)
      dispatch(responseError)
      setTimeout(() => {
        dispatch('')
      }, 5000)
    } 
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')

    newAnecdoteMutation.mutate({ content, votes: 0 })
    
    dispatch(`you created "${content}"`)
    setTimeout(() => {
      dispatch('')
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
