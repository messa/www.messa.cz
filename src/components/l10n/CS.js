import React from 'react'
import { LanguageContext } from './LanguageContext'

class CS extends React.Component {

  static contextType = LanguageContext

  render() {
    const { children } = this.props
    return this.context === 'cs' ? children : null
  }

}

export default CS