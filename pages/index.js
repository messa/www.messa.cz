import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Head from 'next/head'
import Layout from '../components/Layout'
import LanguageContext from '../util/language-context'
import { EN, CS } from '../components/intl'

export default class HomePage extends React.Component {

  static async getInitialProps({ query }) {
    const { language } = query
    return { language }
  }

  render() {
    const { language } = this.props
    if (!language) {
      return (
        <p style={{ margin: 50, textAlign: 'center' }}>
          <a href='/en/'>English</a> · <a href='/cs/'>Česky</a>
        </p>
      )
    }
    return (
      <LanguageContext.Provider value={language}>
        <Layout
          csLink={{ href: '/?language=cs', as: '/cs/' }}
          enLink={{ href: '/?language=en', as: '/en/' }}
        >
          <h1 className='siteTitle'>Petr Messner</h1>
          <div className='siteSubtitle'>
            <CS>Softwarový vývojář, startupista</CS>
            <EN>Software developer, startup enthusiast</EN>
          </div>
        </Layout>
      </LanguageContext.Provider>
    )
  }

}
