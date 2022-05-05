/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ['*', 'localhost', 'ezequiel-reyna.herokuapp.com', 'i.pravatar.cc'] },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  }
}

module.exports = nextConfig
