import React from 'react'
import { Link } from "gatsby"
import { withLanguage } from '../l10n'

import './NavigationMenu.css'

function NavItem({ activeMenuItem, name, title, linkTo }) {
  return (
    <li
      className={activeMenuItem === name ? 'active' : null}
    >
      <Link to={linkTo}>{title}</Link>
    </li>
  )
}

function NavigationMenu({ language, activeMenuItem }) {
  let menuItems
  if (language === 'cs') {
    menuItems = [
      ['home', 'Blog', '/cs/'],
      ['about', 'O mně', '/cs/o-mne'],
      ['projects', 'Projekty', '/cs/projekty'],
      ['contact', 'Kontakt', '/cs/kontakt'],
    ]
  } else {
    menuItems = [
      ['home', 'Blog', '/en/'],
      ['about', 'About', '/en/about'],
      ['projects', 'Projects', '/en/projects'],
      ['contact', 'Contact', '/en/contact'],
    ]
  }
  return (
    <ul className='NavigationMenu'>
      {menuItems.map(([name, title, linkTo], i) => (
        <NavItem
          key={i}
          activeMenuItem={activeMenuItem}
          name={name}
          title={title}
          linkTo={linkTo}
        />
      ))}
    </ul>
  )
}

export default withLanguage(NavigationMenu)