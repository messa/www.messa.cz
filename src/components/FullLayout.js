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

function NavItem({ activeMenuItem, title, name, linkTo,  }) {
  if (activeMenuItem === name) {
    return (
      <li className='active'><Link to={linkTo}>{title}</Link></li>
    )
  } else {
    return (
      <li><Link to={linkTo}>{title}</Link></li>
    )
  }
}

function FullLayout({ children, activeMenuItem }) {
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
            <NavItem activeMenuItem={activeMenuItem} title='Home' name='index' linkTo='/' />
            <NavItem activeMenuItem={activeMenuItem} title='About' name='about' linkTo='/about' />
            <NavItem activeMenuItem={activeMenuItem} title='Projects' name='projects' linkTo='/projects' />
            <NavItem activeMenuItem={activeMenuItem} title='Contact' name='contact' linkTo='/contact' />
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
