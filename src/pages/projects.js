import React from 'react'
import FullLayout from '../components/FullLayout'

function AboutPage() {
  return (
    <FullLayout activeMenuItem='projects'>
      <h1>Projects</h1>
      <p>
        Github: <a href='https://github.com/messa'>github.com/messa</a>
      </p>
    </FullLayout>
  )
}

export default AboutPage
