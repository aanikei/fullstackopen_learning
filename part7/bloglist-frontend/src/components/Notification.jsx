import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)
  console.log('message', message)

  if (message === null) {
    return null
  }

  return (
    <div className={message.success ? 'success' : 'error'}>
      {message.message}
    </div>
  )
}

export default Notification
