import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotif(state, action) {
      return action.payload
    },
    removeNotif() {
      return ''
    }
  }
})

export const { setNotif, removeNotif } = notificationSlice.actions

export const setNotification = (content, time) => {  
  return dispatch => {    
    dispatch(setNotif(content))
    setTimeout(() => {
      dispatch(removeNotif())
    }, 1000 * time)
  }
}

export default notificationSlice.reducer