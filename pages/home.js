import React from 'react'
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
    return (
      <LanguageContext.Provider value={language}>
        <Layout
          csLink={{ href: '/home?language=cs', as: '/cs/' }}
          enLink={{ href: '/home?language=en', as: '/en/' }}
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
