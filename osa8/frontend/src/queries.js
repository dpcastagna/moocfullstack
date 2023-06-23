import { gql } from '@apollo/client'

// export const ALL_PERSONS = gql`
//   query {
//     allPersons  {
//       name
//       phone
//       id
//     }
//   }
// `

// export const FIND_PERSON = gql`
//   query findPersonByName($nameToSearch: String!) {
//     findPerson(name: $nameToSearch) {
//       name
//       phone
//       id
//       address {
//         street
//         city
//       }
//     }
//   }
// `

// export const EDIT_NUMBER = gql`
//   mutation editNumber($name: String!, $phone: String!) {
//     editNumber(name: $name, phone: $phone)  {
//       name
//       phone
//       address {
//         street
//         city
//       }
//       id
//     }
//   }
// `

// export const CREATE_PERSON = gql`
//   mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
//     addPerson(
//       name: $name,
//       street: $street,
//       city: $city,
//       phone: $phone
//     ) {
//       name
//       phone
//       id
//       address {
//         street
//         city
//       }
//     }
//   }
// `

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
      name
      bookCount
      born
    }
    genres
    id
  }
}
`

export const GENRE_BOOKS = gql`
query ($genre: String) {
  allBooks(genre: $genre) {
    title
    published
    author {
      name
      bookCount
      born
    }
    genres
    id
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    bookCount
  }
}
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
        name,
        born,
        bookCount
      }
    }
  }
`
