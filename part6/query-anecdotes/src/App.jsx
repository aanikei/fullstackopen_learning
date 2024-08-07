import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import NotificationContext from './notificationContext'
import { useContext } from 'react'

const App = () => {
  const queryClient = useQueryClient()
  const [counter, dispatch] = useContext(NotificationContext)
  
  const voteAnecdoteMutation = useMutation({ 
    mutationFn: updateAnecdote,
    onSuccess: () => {      
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    } 
  })

  const handleVote = (anecdote) => {
    console.log('vote anecdote', anecdote)
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch(`you voted for "${anecdote.content}"`)
    setTimeout(() => {
      dispatch('')
    }, 5000)
  }

  const result = useQuery({    
    queryKey: ['anecdotes'],    
    queryFn: () => getAnecdotes()
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {    
    return <div>loading data...</div>  
  }

  if ( result.isError ) {    
    return <div>anecdote service not available for whatever reason</div>  
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
