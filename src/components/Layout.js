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
        <h1 className='siteTitle'>
          <Link to='/'>{siteMetadata.title}</Link>
        </h1>
        <div className='subtitle'>
          Software developer,<br />startup cofounder
        </div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
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
