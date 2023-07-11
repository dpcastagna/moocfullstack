import { useQuery } from '@apollo/client'
import { GENRE_BOOKS } from '../queries'
import { useState, useEffect } from 'react'
import GenreButtons from './GenreButtons'

const GenreSelected = ({ genres, selectedGenre, setSelectedGenre }) => {
  const [genre, setgenre] = useState(undefined)
  const genreBooks = useQuery(GENRE_BOOKS, {
    variables: { genre },
    // pollInterval: 2000,
    onError: (error) => {
      // setError(error.graphQLErrors[0].message)
      console.log(error.graphQLErrors[0].message)
    }
  })
  useEffect(() => {
    setgenre(selectedGenre)
  }, [selectedGenre])

  if (genreBooks.loading)  {
    return <div>loading...</div>
  }
  // console.log(genre, selectedGenre, genreBooks.data.allBooks)
  const books = genreBooks.data.allBooks

  return (
    <div>
      <h2>books</h2>
      in genre <b>{selectedGenre}</b>
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
      <GenreButtons genres={genres} setSelectedGenre={setSelectedGenre} />
    </div>
  )
}

export default GenreSelected