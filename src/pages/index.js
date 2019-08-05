import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

function HomePage({ data }) {
  const posts = data.allMarkdownRemark.edges.map(edge => edge.node)
  return (
    <Layout>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2><Link to={`/${post.frontmatter.slug}`}>{post.frontmatter.title}</Link></h2>
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
            slug
          }
        }
      }
    }
  }
`

export default HomePage