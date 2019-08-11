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
      name: 'slug',
      value: slug,
    })

    let language = node.frontmatter.language
    if (!language) {
      // TODO - get language from filename
      language = 'en'
    }
    createNodeField({
      node,
      name: 'language',
      value: language,
    })
  }
}

exports.createPages = async function createPages({ graphql, actions }) {
  const { createPage } = actions
  await createStaticPages(createPage)
  await createPostPages(graphql, createPage)
}

async function createStaticPages(createPage) {
  const p = (language, relPath, templateFile) => createPage({
    path: `${language}/${relPath}`,
    component: path.resolve(`src/templates/${templateFile}`),
    context: { language }
  })

  p('en', '', 'home.js')
  p('cs', '', 'home.js')

  p('en', 'about', 'about.js')
  p('cs', 'o-mne', 'about.js')

  p('en', 'projects', 'projects.js')
  p('cs', 'projekty', 'projects.js')

  p('en', 'contact', 'contact.js')
  p('cs', 'kontakt', 'contact.js')
}

async function createPostPages(graphql, createPage) {
  const postTemplate = path.resolve('src/templates/post.js')
  const { errors, data } = await graphql(postQuery)
  if (errors) {
    throw new Error(`Failed to query posts: ${errors}`)
  }
  const posts = data.allMarkdownRemark.edges.map(edge => edge.node)
  posts.forEach(post => {
    const { language, slug } = post.fields
    createPage({
      path: `${language}/${slug}`,
      component: postTemplate,
      context: { language, slug },
    })
  })
}

const postQuery = `
  query postQuery {
    allMarkdownRemark(limit: 1000) {
      edges {
        node {
          fields {
            language
            slug
          }
        }
      }
    }
  }
`
