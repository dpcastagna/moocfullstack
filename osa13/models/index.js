const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./reading_list')

Blog.belongsTo(User)
User.hasMany(Blog)

User.belongsToMany(Blog, { through: ReadingList, as: 'markedBlogs' })
Blog.belongsToMany(User, { through: ReadingList, as: 'usersMarked' })

module.exports = {
  Blog, User
}