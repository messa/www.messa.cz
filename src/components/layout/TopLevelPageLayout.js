import React from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import SiteTitle from './SiteTitle'
import SiteSubtitle from './SiteSubtitle'
import NavigationMenu from './NavigationMenu'

import './TopLevelPageLayout.css'

function TopLevelPageLayout({ children, siteTitleAsH1, enLink, csLink, activeMenuItem }) {
  return (
    <div className='TopLevelPageLayout'>
      <LanguageSwitcher enLink={enLink} csLink={csLink} />
      <div className='content'>
        <aside>
          <SiteTitle asH1={siteTitleAsH1} />
          <SiteSubtitle />
          <nav>
            <NavigationMenu activeMenuItem={activeMenuItem} />
          </nav>
        </aside>
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}

export default TopLevelPageLayout