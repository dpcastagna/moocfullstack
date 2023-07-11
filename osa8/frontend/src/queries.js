import { gql } from '@apollo/client'

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    id
    name
    bookCount
    born
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author {
      id
      name
      bookCount
      born
    }
    published
    genres
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      published
      author {
        ...AuthorDetails
      }
      genres
      id
    }
  }
  ${AUTHOR_DETAILS}
`

export const GENRE_BOOKS = gql`
  query ($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        ...AuthorDetails
      }
      genres
      id
    }
  }
  ${AUTHOR_DETAILS}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    ...AuthorDetails
  }
}
${AUTHOR_DETAILS}
`
export const UPDATE_AUTHOR = gql`
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
export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $pubYear: Int!, $genres: [String!]!) {
    addBook  (
      title: $title,
      author: $author,
      published: $pubYear,
      genres: $genres
    ) {
      title,
      published,
      genres,
      id,
      author {
        id
        name,
        born,
        bookCount
      }
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded{
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`