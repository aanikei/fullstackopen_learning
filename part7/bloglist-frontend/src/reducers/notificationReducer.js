import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotif(state, action) {
      return action.payload
    },
    removeNotif() {
      return null
    }
  }
})

export const { setNotif, removeNotif } = notificationSlice.actions

export const setNotification = (content) => {
  return dispatch => {
    dispatch(setNotif(content))
    setTimeout(() => {
      dispatch(removeNotif())
    }, 5000)
  }
}

export default notificationSlice.reducer