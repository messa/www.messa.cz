import React from 'react'
import { graphql } from 'gatsby'
import { LanguageContext } from '../components/l10n'
import TopLevelPageLayout from '../components/layout/TopLevelPageLayout'
import PostList from '../components/posts/PostList'

function HomePage({ pageContext, data }) {
  const { language } = pageContext
  const posts = data.allMarkdownRemark.edges.map(edge => edge.node)
    .filter(p => p.fields.language == language)
  return (
    <LanguageContext.Provider value={language}>
      <TopLevelPageLayout
        csLink='/cs/'
        enLink='/en/'
        siteTitleAsH1={true}
        activeMenuItem='home'
      >

        <PostList posts={posts} />

      </TopLevelPageLayout>
    </LanguageContext.Provider>
  )
}

export const query = graphql`
  query HomePageQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          excerpt(format: HTML)
          frontmatter {
            title
          }
          fields {
            slug
            language
          }
        }
      }
    }
  }
`

export default HomePage