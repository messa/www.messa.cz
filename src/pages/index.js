import React from 'react'
import { Link } from 'gatsby'

import '../css/language-choose-page.css'

function IndexPage() {
  return (
    <div className='LanguageChooser'>
      <ul>
        <li><Link to='/en/'>English</Link></li>
        <li><Link to='/cs/'>Česky</Link></li>
      </ul>
    </div>
  )
}

export default IndexPage
