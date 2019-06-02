import React from 'react'
import Link from 'next/link'

export default () => (
  <p>
    <Link href='/en/'><a>English</a></Link>
    {' · '}
    <Link href='/cs/'><a>Česky</a></Link>
  </p>
)
