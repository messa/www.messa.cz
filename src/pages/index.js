import React from 'react'
import { graphql } from 'gatsby'
import FullLayout from '../components/FullLayout'
import PostList from '../components/PostList'

function HomePage({ data }) {
  const posts = data.allMarkdownRemark.edges.map(edge => edge.node)
  return (
    <FullLayout activeMenuItem='index'>
      <PostList posts={posts} />
    </FullLayout>
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
