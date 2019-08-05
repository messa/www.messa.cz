import React from 'react'
import { Link, graphql, useStaticQuery } from "gatsby"

import './basic.css'
import './PostLayout.css'

const staticQuery = graphql`
  query PostLayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

function PostLayout({ children }) {
  const data = useStaticQuery(staticQuery)
  const { siteMetadata } = data.site
  return (
    <div className='PostLayout'>
      <nav>
        <div className='siteTitle'>
          <Link to='/'>{siteMetadata.title}</Link>
        </div>
        <ul>
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
      {children}
    </div>
  )
}

export default PostLayout