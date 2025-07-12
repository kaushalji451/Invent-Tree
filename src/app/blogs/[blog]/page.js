import React from 'react'

const Blog = ({params}) => {

    const blog = params.blog
  return (
    <div>
        {blog}
    </div>
  )
}

export default Blog