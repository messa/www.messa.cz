import React from 'react'
import Link from 'next/link'

function LinkOrBold({ link, active, children }) {
  if (active) {
    return (<b className='active'>{children}</b>)
  } else if (link) {
    return (<Link href={link.href} as={link.as}><a>{children}</a></Link>)
  }
}

export default function LanguageSwitch({ language, enLink, csLink }) {
  return (
    <div className='LanguageSwitch'>
      <LinkOrBold link={enLink} active={language === 'en'}>english</LinkOrBold>
      {' · '}
      <LinkOrBold link={csLink} active={language === 'cs'}>česky</LinkOrBold>
    </div>
  )
}
