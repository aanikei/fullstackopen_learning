import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'test notification',
  reducers: {
    addText(state, action) {
      return action.payload
    }
  }
})

export const { addText } = notificationSlice.actions
export default notificationSlice.reducer