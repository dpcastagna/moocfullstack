import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      const content = action.payload
      state.message = content
    }
  },
})

export const { createNotification } = notificationSlice.actions
export default notificationSlice.reducer