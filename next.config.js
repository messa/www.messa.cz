module.exports = {
  useFileSystemPublicRoutes: false,
  exportPathMap: async function(defaultPathMap) {
    return {
      '/': { page: '/' },
      '/cs/': { page: '/home', query: { language: 'cs' } },
      '/en/': { page: '/home', query: { language: 'en' } },
    }
  }
}
