import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net",
              "img-src 'self' data: https://www.facebook.com https://connect.facebook.net",
              "connect-src 'self' https://www.facebook.com https://graph.facebook.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
