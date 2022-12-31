//import { useSelector } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filteredAnecdotes',
  initialState: {
    filter: '',
    filteredAnecdotes: []
  },
  reducers: {
    createFilter(state, action) {
      const content = action.payload
      state.filter = content.toLowerCase()
    },
    createFiltered(state, action) {
      const content = action.payload
      //console.log(content)
      state.filteredAnecdotes = content.filter(anecdote => anecdote.content
        .toLowerCase()
        .includes(state.filter)
        ).sort((a, b) => {
          return a.votes > b.votes ? -1 : 1
        })
    }
  },
})

export const { createFilter, createFiltered } = filterSlice.actions
export default filterSlice.reducer