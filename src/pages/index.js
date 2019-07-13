import React from 'react'
import { Link, graphql } from 'gatsby'

function HomePage({ data }) {
  const { siteMetadata } = data.site
  const posts = data.allMarkdownRemark.edges.map(edge => edge.node)
  return (
    <div>
      <h1>{siteMetadata.title}</h1>
      <p><Link to='/about'>About</Link></p>
      Posts:
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.frontmatter.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
      }
    }
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
