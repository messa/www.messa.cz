import React from 'react'
import { Link } from 'gatsby'
import { EN, CS } from '../l10n'

import './LanguageSwitcher.css'

function LanguageSwitcher({ enLink, csLink }) {
  return (
    <div className='LanguageSwitcher'>
      <EN><b>english</b></EN>
      <CS><Link to={enLink || '/en/'}>english</Link></CS>
      {' · '}
      <CS><b>česky</b></CS>
      <EN><Link to={csLink || '/cs/'}>česky</Link></EN>
    </div>
  )
}

export default LanguageSwitcher
