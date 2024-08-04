import PropTypes from 'prop-types';
import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  console.log("notificationReducer", action)
  return action
}

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

NotificationContextProvider.propTypes = {
  children: PropTypes.object
}