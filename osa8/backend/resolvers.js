const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),//books.length,
    authorCount: async () => Author.collection.countDocuments(),//authors.length,
    allBooks: async (root, args) => {
      console.log("allBooks: ", Date().split(' ')[4], args)
      if (args.author || args.genre) {
        const author = await Author.findOne({ name: args.author })
        console.log("argsit löytyi", author)
        let filteredBooks = args.author 
        ? await Book.find({ author: author._id }) 
        : await Book.find({})
        // console.log(filteredBooks)
        filteredBooks = args.genre ? filteredBooks.filter(b => b.genres.includes(args.genre)) : filteredBooks
        return filteredBooks
      }
      // console.log(await Book.find({}))
      return Book.find({})
    },
    allAuthors: async () => {
      console.log('allAuthorsissa')
      return await Author.find({})
    }, //authors,
    // me: async () => User.find({}), //TODO
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      console.log('Authorissa')
      return await Book.count({ author: root.id })
    },//books.filter(b => b.author === root.name).length,
    born: (root) => root.born
  },
  Book: {
    author: async (root) => {
      // console.log("Bookissa: ", root.author._id.toString())
      const author = await Author.findOne({_id: root.author._id})
      // console.log("Bookin author: ", author)
      return author
      // {
      //   name: author.name,
      //   bookCount: author.bookCount,
      //   born: author.born
      // }
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log(args)
      const user = context.currentUser
      console.log('addBook user: ', user)
      if (!user) {
        throw new GraphQLError('Adding book failed, please login.', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })  
      }

      console.log(args)
      let author = await Author.findOne({name: args.author})//authors.filter(a => a.name === args.author)
      // console.log(author)
      if (!author) {
        console.log("ei löytynyt authoria")
        const newAuthor = new Author({ name: args.author, born: null })
        console.log(newAuthor.isNew, newAuthor)
        try {
          await newAuthor.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
        author = newAuthor
      }

      const book = new Book({ ...args, author: author })
      
      console.log("uudessa kirjassa: ", book, author, args)
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const user = context.currentUser
      console.log('editAuthor user: ', user)
      if (!user) {
        throw new GraphQLError('Editing author failed, please login.', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })  
      }

      const author = await Author.findOne({ name: args.name })//authors.find(a => a.name === args.name)
      if (!author) {
        return null
      }
      // console.log(author, args)
      author.born = args.setBornTo
      try {
        author.save()
      } catch (error) {
        throw new GraphQLError('Editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
      return author
      // const updatedAuthor = { ...args, born: args.setBornTo }
      // authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      // return updatedAuthor
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers