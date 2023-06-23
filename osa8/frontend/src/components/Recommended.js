import { useQuery } from '@apollo/client'
import { ME, GENRE_BOOKS } from '../queries'
import { useState, useEffect } from 'react'

const Recommended = (props) => {
  const [genre, setGenre] = useState(undefined)

  const me = useQuery(ME)

  const genreBooks = useQuery(GENRE_BOOKS, {
    variables: { genre },
    pollInterval: 2000,
    onError: (error) => {
      // setError(error.graphQLErrors[0].message)
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( me.data ) {
      const favorite = me.data?.me?.favoriteGenre
      setGenre(favorite)
      // localStorage.setItem('library-user-token', token)
      // setPage('authors')
    }
    console.log('recommended useEffect: ', me.data, genre)
  }, [me.data, genre]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  if (me.loading) {
    return <div>loading...</div>
  }

  const books = genreBooks.data.allBooks

  console.log(props, me, genre, books)
  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <b>{genre}</b>

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

export default Recommended