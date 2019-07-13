import React from 'react'
import { Link, graphql, useStaticQuery } from "gatsby"

const staticQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

function Layout({ children }) {
  const data = useStaticQuery(staticQuery)
  const { siteMetadata } = data.site
  return (
    <div>
      <h1>{siteMetadata.title}</h1>
      <nav>
        <ul>
          <li>
            <Link to='/'>home</Link>
          </li>
          <li>
            <Link to='/about'>about</Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  )
}

export default Layout
