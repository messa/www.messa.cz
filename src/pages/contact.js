import React from 'react'
import FullLayout from '../components/FullLayout'

function AboutPage() {
  return (
    <FullLayout activeMenuItem='contact'>
      <h1>Contact</h1>

      <p>
        E-mail address:{' '}
        <a href='mailto:petr.messner@gmail.com'>petr.messner@gmail.com</a>
      </p>
    </FullLayout>
  )
}

export default AboutPage
