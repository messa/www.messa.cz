import React from 'react'
import Head from 'next/head'
import LanguageSwitch from './LanguageSwitch'
import LanguageContext from '../util/language-context'

export default class Layout extends React.Component {

  static contextType = LanguageContext

  render() {
    const { children, enLink, csLink } = this.props
    const language = this.context
    return (
      <div className='Layout'>
        <Head>
          <title>Messa.cz</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,500,600" />
          <link rel='stylesheet' href='/static/main.css' />
        </Head>
        <LanguageSwitch language={language} enLink={enLink} csLink={csLink} />
        {children}
      </div>
    )
  }

}
