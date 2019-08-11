import React from 'react'
import TopLevelPageLayout from '../components/layout/TopLevelPageLayout'
import { LanguageContext, EN, CS } from '../components/l10n'

function HomePage({ pageContext }) {
  const { language } = pageContext
  return (
    <LanguageContext.Provider value={language}>
      <TopLevelPageLayout
        csLink='/cs/o-mne'
        enLink='/en/about'
        activeMenuItem='about'
      >
        <EN><h1>About me</h1></EN>
        <CS><h1>O mně</h1></CS>

        <p>
          LinkedIn: <a href='https://www.linkedin.com/in/messa/'>linkedin.com/in/messa</a>
        </p>

      </TopLevelPageLayout>
    </LanguageContext.Provider>
  )
}

export default HomePage