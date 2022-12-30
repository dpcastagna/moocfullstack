import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
//import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    //const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(content))
    dispatch(createNotification(`new anecdote '${content}' created`))
  }

  return(
    <div>
      <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div><input name="anecdote"/></div>
          <button type="submit">create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm