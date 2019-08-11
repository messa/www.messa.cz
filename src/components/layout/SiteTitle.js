import React from 'react'
import { Link, graphql, useStaticQuery } from "gatsby"
import { withLanguage } from '../l10n'

import './SiteTitle.css'

const siteTitleQuery = graphql`
  query siteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

function SiteTitle({ asH1, language }) {
  const staticData = useStaticQuery(siteTitleQuery)
  const { siteMetadata } = staticData.site
  if (asH1) {
    return (
      <h1 className='siteTitle'>
        <Link to={`/${language}/`}>{siteMetadata.title}</Link>
      </h1>
    )
  } else {
    return (
      <div className='siteTitle'>
        <Link to={`/${language}/`}>{siteMetadata.title}</Link>
      </div>
    )
  }
}

export default withLanguage(SiteTitle)
