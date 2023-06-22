import { useQuery } from '@apollo/client'
import { ME, GENRE_BOOKS } from '../queries'
import { useState, useEffect } from 'react'

const Recommended = (props) => {
  const [genre, setGenre] = useState(undefined)

  const me = useQuery(ME)

  const genreBooks = useQuery(GENRE_BOOKS, {
    variables: { genre },
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
  }, [me.data]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  if (me.loading) {
    return <div>loading...</div>
  }

  const books = genreBooks.data.allBooks



  console.log(props, me, books)
  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre {genre}

    </div>
  )
}

export default Recommended