import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

function HomePage({ data }) {
  const posts = data.allMarkdownRemark.edges.map(edge => edge.node)
  return (
    <Layout>
      Posts:
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.frontmatter.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </li>
        ))}
      </ul>
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
          }
        }
      }
    }
  }
`

export default HomePage
