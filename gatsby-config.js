module.exports = {
  siteMetadata: {
    title: `Petr Messner`,
    title2: `Messa.cz`,
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
  ],
}
