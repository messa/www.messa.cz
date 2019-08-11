import React from 'react'
import { Link } from 'gatsby'
import { EN, CS } from '../l10n'

function LanguageSwitcher({ enLink, csLink }) {
  return (
    <div className='LanguageSwitcher'>
      <EN><span className='active'>english</span></EN>
      <CS><Link to={enLink || '/en/'}>english</Link></CS>
      {' · '}
      <CS><span className='active'>česky</span></CS>
      <EN><Link to={csLink || '/cs/'}>česky</Link></EN>
    </div>
  )
}

export default LanguageSwitcher