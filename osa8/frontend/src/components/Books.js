// import { useQuery, useSubscription } from '@apollo/client'
// import { ALL_BOOKS, BOOK_ADDED } from '../queries'
import { useState } from 'react'
import GenreSelected from './GenreSelected'
import GenreButtons from './GenreButtons'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState('')

  const allBooks = props.books

  if (!props.show) {
    return null
  }

  if (allBooks.loading) {
    return <div>loading...</div>
  }

  // console.log(allBooks.data?.allBooks)

  const books = allBooks.data?.allBooks
  const genres = [
    ...new Set(
      books.reduce((genres, book) => {
        return genres.concat(book.genres)
        }, []
      )
    )
  ]
  // console.log(genres)
  if (selectedGenre === '') {
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

        <GenreButtons genres={genres} setSelectedGenre={setSelectedGenre} />
      </div>
    )
  }
  return (
    <div>
      <GenreSelected genres={genres} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
    </div>
  )
}

export default Books
