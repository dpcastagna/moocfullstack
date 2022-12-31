import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createFilter, createFiltered } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  
  useEffect(() => {
    dispatch(createFiltered(anecdotes))
  }, [dispatch, anecdotes])
  

  const handleChange = (event) => {
    event.preventDefault()
    // input-kentän arvo muuttujassa event.target.value
    const input = event.target.value
    //console.log(input)
    dispatch(createFilter(input))
    dispatch(createFiltered(anecdotes))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter