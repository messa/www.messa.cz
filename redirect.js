module.exports = (req, res) => {
  let lang = 'en'
  const al = req.headers['accept-language']
  if (al && al.match(/cs/)) {
    lang = 'cs'
  }
  res.status(302)
  res.setHeader('Location', `/${lang}/`)
  res.setHeader('Vary', 'Accept-Language')
  res.setHeader('Cache-Control', 'public,max-age=60')
  res.send(`Redirecting to /${lang}/`)
}
