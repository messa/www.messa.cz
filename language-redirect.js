module.exports = (req, res) => {
  let lang = 'en'
  try {
    if (req.headers['accept-language'].match('/cs/')) {
      lang = 'cs'
    }
  } catch (err) {}

  const host = req.headers['host'] || 'messa.cz'

  res.writeHead(302, { 'Location': 'https://' + host + '/' + lang + '/' })
  res.end()
}
