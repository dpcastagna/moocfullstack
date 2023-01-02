import { createSlice } from '@reduxjs/toolkit'

let timer
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

export const setNotification = (content, time) => {
  return dispatch => {
    if (typeof timer === 'number') {
      clearTimeout(timer)
    }
    dispatch(createNotification(content))
    timer = setTimeout(() => {
      dispatch(createNotification(null))
    }, time * 1000)
  }
}

export const { createNotification } = notificationSlice.actions
export default notificationSlice.reducer