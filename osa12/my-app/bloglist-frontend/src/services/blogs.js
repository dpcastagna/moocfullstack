import axios from 'axios'
const baseUrl = process.env.REACT_APP_BACKEND_URL
  ? process.env.REACT_APP_BACKEND_URL + '/blogs'
  : 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${ baseUrl }/${id}`, newObject)
  return request.data
}

const remove = async (id, user) => {
  console.log(id, user)
  const request = await axios.delete([`${ baseUrl }/${id}`, user.username])
  return request.data
}
export default { getAll, create, update, setToken, remove }