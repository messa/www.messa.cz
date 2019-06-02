import React from 'react'
import LanguageContext from '../util/language-context'

export class CS extends React.Component {

  static contextType = LanguageContext

  render() {
    const { children } = this.props
    const language = this.context
    return language === 'cs' ? children : null
  }

}

export class EN extends React.Component {

  static contextType = LanguageContext

  render() {
    const { children } = this.props
    const language = this.context
    return language === 'en' ? children : null
  }

}
