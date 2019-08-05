import React from 'react'
import { Link, graphql, useStaticQuery } from "gatsby"

import './basic.css'
import './FullLayout.css'

const staticQuery = graphql`
  query FullLayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

function FullLayout({ children }) {
  const data = useStaticQuery(staticQuery)
  const { siteMetadata } = data.site
  return (
    <div className='FullLayout'>
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
              <Link to='/projects'>Projects</Link>
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

export default FullLayout
