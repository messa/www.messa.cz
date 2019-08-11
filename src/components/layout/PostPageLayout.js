import React from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import SiteTitle from './SiteTitle'
import NavigationMenu from './NavigationMenu'

import './PostPageLayout.css'

function PostPageLayout({ children, enLink, csLink }) {
  return (
    <div className='PostPageLayout'>
      <header>
        <SiteTitle asH1={false} />
        <nav>
          <NavigationMenu activeMenuItem={null} />
        </nav>
        <LanguageSwitcher enLink={enLink} csLink={csLink} />
      </header>
      <main>
        {children}
      </main>
    </div>
  )
}

export default PostPageLayout