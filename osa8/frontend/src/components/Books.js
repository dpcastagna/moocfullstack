import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

// const ALL_BOOKS = gql`
//   query {
//     allBooks  {
//       title
//       published
//       author {
//         name
//         bookCount
//         born
//       }
//       genres
//       id
//     }
//   }
// `

const Books = (props) => {
  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000  
  })
  const genres = []

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  // console.log(result.data?.allBooks)

  const books = result.data?.allBooks
  
  console.log(genres)
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books
