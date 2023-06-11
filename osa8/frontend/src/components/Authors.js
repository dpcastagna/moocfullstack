import { gql, useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select'

const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`
const UPDATE_AUTHOR = gql`
  mutation updateAuthor($selAuthor: String!, $numBirthYear: Int!) {
    editAuthor  (
      name: $selAuthor,
      setBornTo: $numBirthYear
    ) {
      name,
      born
    }
  }
`

const Authors = (props) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [birthYear, setBirthYear] = useState('')
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000  
  })

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR)

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  // console.log(result.data?.allAuthors)

  const authors = result.data.allAuthors
  const authorNames = authors.map((a) => {return { value: a.name, label: a.name }})
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
