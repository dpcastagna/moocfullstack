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
    }/*,
    voteNotification(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )  
    }*/
  },
})

export const { createNotification/*, voteNotification*/ } = notificationSlice.actions
export default notificationSlice.reducer