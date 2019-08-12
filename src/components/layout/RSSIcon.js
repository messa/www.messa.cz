import React from 'react'
import { withLanguage } from '../l10n'

function RSSIcon({ language }) {
  return (
    <a href={`/${language}/rss.xml`}>RSS</a>
  )
}

export default withLanguage(RSSIcon)