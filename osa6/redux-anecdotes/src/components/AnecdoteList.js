import { useDispatch, useSelector } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filteredAnecdotes.filter)
  const sortedAnecdotes = [...anecdotes].sort((a, b) => {
    return a.votes > b.votes ? -1 : 1
  })
  
  const fAnecdotes = [...sortedAnecdotes].filter(anecdote => anecdote.content.includes(filter))
  
  //console.log(fAnecdotes)
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
              dispatch(createNotification(`you voted '${anecdote.content}'`)))}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList