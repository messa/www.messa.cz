import React from 'react'
import { Link, graphql, useStaticQuery } from "gatsby"

import './Layout.css'

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
    <div className='Layout'>
      <div className='navigation'>
        <h1 className='siteTitle'>{siteMetadata.title}</h1>
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
      </div>
      <div className='mainContent'>
        {children}
      </div>
    </div>
  )
}

export default Layout
