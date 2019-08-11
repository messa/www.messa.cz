import React from 'react'
import { graphql } from 'gatsby'
import { LanguageContext } from '../components/l10n'
import PostPageLayout from '../components/layout/PostPageLayout'

function Post({ pageContext, data }) {
  const { language } = pageContext
  const { post, csVersion, enVersion } = data
  return (
    <LanguageContext.Provider value={language}>
      <PostPageLayout
        csLink={!csVersion ? null : `/cs/${csVersion.fields.slug}`}
        enLink={!enVersion ? null : `/en/${enVersion.fields.slug}`}
      >
        <article>
          <h1 className='postTitle'>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
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
    csVersion: markdownRemark(
      fields: {
        language: { eq: "cs" },
        slug: { eq: $slug }
      }
    ) {
      fields {
        slug
      }
    }
    enVersion: markdownRemark(
      fields: {
        language: { eq: "en" },
        slug: { eq: $slug }
      }
    ) {
      fields {
        slug
      }
    }
  }
`

export default Post
