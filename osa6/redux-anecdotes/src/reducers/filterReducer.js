import { useSelector } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filter: null,
  fAnecdotes: {}
}

const filterSlice = createSlice({
  name: 'filteredAnecdotes',
  initialState,
  reducers: {
    createFilter(state, action) {
      const content = action.payload
      state.filter = content
    }
  },
})

export const { createFilter } = filterSlice.actions
export default filterSlice.reducer