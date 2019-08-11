import React from 'react'
import { Link } from 'gatsby'

import './PostList.css'

function PostList({ posts }) {
  return (
    <ul className='PostList'>
      {posts.map(post => (
        <li key={post.id}>
          <h2><Link to={`/${post.fields.language}/${post.fields.slug}`}>{post.frontmatter.title}</Link></h2>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        </li>
      ))}
    </ul>
  )
}

export default PostList