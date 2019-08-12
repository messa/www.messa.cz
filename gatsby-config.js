module.exports = {
  siteMetadata: {
    title: `Petr Messner`,
    title2: `Messa.cz`,
    siteUrl: 'https://messa.cz'
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/posts/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        commonmark: true, // CommonMark mode (default: true)
        footnotes: true, // Footnotes mode (default: true)
        pedantic: true, // Pedantic mode (default: true)
        gfm: true, // GitHub Flavored Markdown mode (default: true)
        plugins: [],
      },
    },
    'gatsby-plugin-remove-serviceworker',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: ['en', 'cs'].map(language => ({
          output: `/${language}/rss.xml`,
          title: 'Blog Messa.cz',
          match: `^/${language}/`,
          query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [ frontmatter___date ] }
                filter: {
                  fields: {
                    language: { eq: "${language}" }
                  }
                }
              ) {
                edges {
                  node {
                    excerpt(pruneLength: 250)
                    html
                    fields {
                      language
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }

            }
          `,
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            const siteUrl = site.siteMetadata.siteUrl
            const posts = allMarkdownRemark.edges.map(edge => edge.node)
            return posts.map(post => {
              return {
                title: post.frontmatter.title,
                date: post.frontmatter.date,
                url: `${siteUrl}/${post.fields.language}/${post.fields.slug}`,
                guid: `${siteUrl}/${post.fields.language}/${post.fields.slug}`,
              }
            })
          }
        })),
      }
    },
  ],
}
