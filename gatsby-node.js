const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require('path')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    let slug = node.frontmatter.slug
    if (!slug) {
      slug = createFilePath({ node, getNode, basePath: `pages` })
    }
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

const postQuery = `
  query postQuery {
    allMarkdownRemark(limit: 1000) {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
  }
`

exports.createPages = async function createPages({ graphql, actions }) {
  const { createPage } = actions
  const postTemplate = path.resolve('src/templates/post.js')
  const { errors, data } = await graphql(postQuery)
  if (errors) {
    throw new Error(`Failed to query posts: ${errors}`)
  }
  const posts = data.allMarkdownRemark.edges.map(edge => edge.node)
  posts.forEach(post => {
    const { slug } = post.fields
    createPage({
      path: slug,
      component: postTemplate,
      context: { slug },
    })
  })
}
