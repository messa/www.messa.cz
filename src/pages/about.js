import React from 'react'
import FullLayout from '../components/FullLayout'

function AboutPage() {
  return (
    <FullLayout activeMenuItem='about'>
      <h1>About</h1>
      <p>
        LinkedIn: <a href='https://www.linkedin.com/in/messa/'>linkedin.com/in/messa</a>
      </p>
    </FullLayout>
  )
}

export default AboutPage
