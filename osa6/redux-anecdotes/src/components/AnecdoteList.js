import { useDispatch, useSelector } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  //const anecdotes = useSelector(state => state.anecdotes)
  //const filter = useSelector(state => state.filteredAnecdotes.filter)
  const fAnecdotes = useSelector(state => state.filteredAnecdotes.filteredAnecdotes)
  
  if (fAnecdotes.length === 0) {
    return(
    <div>
      0 anecdotes found that match the filter.
    </div>
    )
  }
  return(
    <div>
      {fAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(createVote(anecdote.id),
              dispatch(setNotification(`you voted '${anecdote.content}'`, 5)))}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList