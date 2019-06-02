module.exports = {
  useFileSystemPublicRoutes: false,
  exportPathMap: async function(defaultPathMap) {
    return {
      '/': { page: '/' },
      '/cs/': { page: '/', query: { language: 'cs' } },
      '/en/': { page: '/', query: { language: 'en' } },
    }
  }
}
