import React from 'react'
import { graphql } from 'gatsby'
import PostLayout from '../components/PostLayout'

function Post({ pageContext, data }) {
  const { post } = data
  return (
    <PostLayout>
      <h1 className='postTitle'>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </PostLayout>
  )
}

export const query = graphql`
  query($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default Post
