import React from 'react'
import { LanguageContext } from './LanguageContext'

function withLanguage(Component) {
  return (props) => (
    <LanguageContext.Consumer>
      {value => <Component language={value} {...props} />}
    </LanguageContext.Consumer>
  )
}


export default withLanguage
