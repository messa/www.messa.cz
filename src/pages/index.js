import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostList from '../components/PostList'

function HomePage({ data }) {
  const posts = data.allMarkdownRemark.edges.map(edge => edge.node)
  return (
    <Layout>
      <PostList posts={posts} />
    </Layout>
  )
}

export const query = graphql`
  query HomePageQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          excerpt(format: HTML)
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`

export default HomePage
