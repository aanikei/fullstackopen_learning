import { useSelector } from 'react-redux'

import Alert from '@mui/material/Alert'

const Notification = () => {
  const message = useSelector(state => state.notification)
  console.log('message', message)

  if (message === null) {
    return null
  }

  return (
    <Alert severity={message.success ? 'success' : 'error'}>{message.message}</Alert>
  )
}

export default Notification
