import React from 'react'
import TopLevelPageLayout from '../components/layout/TopLevelPageLayout'
import { LanguageContext, EN, CS } from '../components/l10n'

function ProjectsPage({ pageContext }) {
  const { language } = pageContext
  return (
    <LanguageContext.Provider value={language}>
      <TopLevelPageLayout
        csLink='/cs/projekty'
        enLink='/en/projects'
        activeMenuItem='projects'
      >
        <EN><h1>Projects</h1></EN>
        <CS><h1>Projekty</h1></CS>

        <p>
          Github: <a href='https://github.com/messa'>github.com/messa</a>
        </p>

      </TopLevelPageLayout>
    </LanguageContext.Provider>
  )
}

export default ProjectsPage