import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  console.log(response.data)
  return response.data
}

const voteAnecdote = async (content) => {
  const id = content
  const all = await axios.get(baseUrl)
  const anecdoteToChange = all.data.find(anecdote => anecdote.id === id)
  //console.log(anecdoteToChange)
  const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
  //console.log(changedAnecdote)
  const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote)
  return response.data
}


export default {
  getAll, 
  createNew,
  voteAnecdote,
}