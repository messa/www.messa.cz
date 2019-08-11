import React from 'react'
import { graphql } from 'gatsby'
import { LanguageContext } from '../components/l10n'
import PostPageLayout from '../components/layout/PostPageLayout'

function Post({ pageContext, data }) {
  const { language } = pageContext
  const { post } = data
  return (
    <LanguageContext.Provider value={language}>
      <PostPageLayout>
        <h1 className='postTitle'>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </PostPageLayout>
    </LanguageContext.Provider>
  )
}

export const query = graphql`
  query($language: String!, $slug: String!) {
    post: markdownRemark(
      fields: {
        language: { eq: $language },
        slug: { eq: $slug }
      }
    ) {
      html
      frontmatter {
        title
      }
      fields {
        language
        slug
      }
    }
  }
`

export default Post
