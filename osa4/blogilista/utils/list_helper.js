const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
	if (blogs.length === 0) {
		return 0
	} else if (blogs.length === 1) {
		return blogs[0].likes
	}
	
	const likes = blogs.reduce(function(sum, blog) {
		return sum + blog.likes
	}, 0)
	return likes
}

const favoriteBlog = (blogs) => {
	const sortedBlogs = blogs.sort((a, b) => {
		return (a.likes > b.likes) ? -1: 1
	})
	//console.log(sortedBlogs)
	return sortedBlogs[0]
}

const mostBlogs = (blogs) => {
	const most = []
	blogs.map(blog => {
		//console.log(blog, most, most.filter(b => b.author === blog.author).length > 0)
		if (most.filter(b => b.author === blog.author).length > 0) {
			const res = most.find(b => b.author === blog.author)
			//console.log(res)
			res.blogs += 1
		} else {
			most.push({author: blog.author,
				blogs : 1})
		}
	})
	most.sort((a, b) => {
		return (a.blogs > b.blogs) ?-1 : 1
	})
	//console.log(most)

	return most[0]
}

const mostLikes = (blogs) => {
	const most = []
	blogs.map(blog => {
		//console.log(blog, most, most.filter(b => b.author === blog.author).length > 0)
		if (most.filter(b => b.author === blog.author).length > 0) {
			const res = most.find(b => b.author === blog.author)
			//console.log(res)
			res.likes += blog.likes
		} else {
			most.push({author: blog.author,
				likes : blog.likes})
		}
	})
	most.sort((a, b) => {
		return (a.likes > b.likes) ?-1 : 1
	})
	//console.log(most)

	return most[0]
}

module.exports = {
  dummy,
  totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}