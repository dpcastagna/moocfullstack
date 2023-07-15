import { /* useQuery, */ useMutation } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const Authors = (props) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [birthYear, setBirthYear] = useState('')
  const allAuthors = props.authors

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS} ],
    onError: (error) => {
      // setError(error.graphQLErrors[0].message)
      console.log(error.graphQLErrors[0].message)
    }
  })
  // console.log(props)
  if (!props.show) {
    return null
  }
  // console.log(allAuthors)
  if (allAuthors.loading)  {
    return <div>loading...</div>
  }

  // console.log(result.data?.allAuthors)

  const authors = allAuthors?.data.allAuthors
  // console.log(authors, result)
  const authorNames = authors?.map((a) => {return { value: a.name, label: a.name }})
  // console.log(result.data?.allAuthors, authorNames)

  const submit = async (event) => {
    event.preventDefault()

    console.log('updated author...')
    // console.log(selectedAuthor)
    const selAuthor = selectedAuthor.value
    const numBirthYear = Number(birthYear)

    updateAuthor({ variables: { selAuthor, numBirthYear } })

    // setSelectedAuthor(null)
    setBirthYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <Select
        defaultValue={selectedAuthor}
        onChange={setSelectedAuthor}
        options={authorNames}
      />
      <input
        value={birthYear}
        onChange={({ target }) => setBirthYear(target.value)}
      /><br />
      <button onClick={submit} type="button">
        update author
      </button>
    </div>
  )
}

export default Authors
