import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, user, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user // varmistus riippuen rakenteesta
    }

    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    returnedBlog.user = blog.user // säilytä lisääjän tiedot
    updateBlog(returnedBlog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          {user.username === blog.user?.username && (
            <button onClick={() => removeBlog(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog
