import React from 'react'
import TopLevelPageLayout from '../components/layout/TopLevelPageLayout'
import { LanguageContext, EN, CS } from '../components/l10n'

function ContactPage({ pageContext }) {
  const { language } = pageContext
  return (
    <LanguageContext.Provider value={language}>
      <TopLevelPageLayout
        csLink='/cs/kontakt'
        enLink='/en/contact'
        activeMenuItem='contact'
      >
        <EN><h1>Contact</h1></EN>
        <CS><h1>Kontakt</h1></CS>

        <p>
          E-mail address:{' '}
          <a href='mailto:petr.messner@gmail.com'>petr.messner@gmail.com</a>
        </p>


      </TopLevelPageLayout>
    </LanguageContext.Provider>
  )
}

export default ContactPage