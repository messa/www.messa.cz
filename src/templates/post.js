import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

function Post({ pageContext, data }) {
  const { post } = data
  return (
    <Layout>
      <h1 className='postTitle'>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
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
