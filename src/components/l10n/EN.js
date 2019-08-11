import React from 'react'
import { LanguageContext } from './LanguageContext'

class EN extends React.Component {

  static contextType = LanguageContext

  render() {
    const { children } = this.props
    return this.context === 'en' ? children : null
  }

}

export default EN