import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GENRE_BOOKS } from '../queries'
import { useState } from 'react'
import GenreSelected from './GenreSelected'

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
  const [selectedGenre, setSelectedGenre] = useState('')

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  // console.log(result.data?.allBooks)

  const books = result.data?.allBooks
  const genres = [
    ...new Set(
      books.reduce((genres, book) => {
        return genres.concat(book.genres)
        }, []
      )
    )
  ]
  // console.log(genres)

  return (
    <div>
      <h2>books</h2>

      <GenreSelected selectedGenre={selectedGenre} />

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
      <br />
      {genres.map((g) => {
        return(
        <button key={g} onClick={() => setSelectedGenre(g)}>{g}</button>
        )
      })}
      <button onClick={() => setSelectedGenre('')}>all genres</button>
    </div>
  )
}

export default Books
