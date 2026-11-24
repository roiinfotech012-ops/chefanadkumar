import fs from 'node:fs';
import path from 'node:path';

// Load .env if not already loaded so ALLOWED_HOSTS is always mapped from .env
function getEnvAllowedHosts() {
  let raw = process.env.ALLOWED_HOSTS || '';
  if (!raw) {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^\s*ALLOWED_HOSTS\s*=\s*(.+)$/m);
      if (match) {
        raw = match[1].trim().replace(/^['"]|['"]$/g, '');
      }
    }
  }
  return raw
    .split(',')
    .map((h) => h.trim())
    .filter(Boolean);
}

const allowedHosts = getEnvAllowedHosts();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  allowedDevOrigins: allowedHosts,
  experimental: {
    serverActions: {
      allowedOrigins: allowedHosts,
    },
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'www.chefanandkumar.com',
      },
      {
        protocol: 'https',
        hostname: 'blog.chefanandkumar.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/about.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/portfolio.html',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/recipes.html',
        destination: '/recipes',
        permanent: true,
      },
      {
        source: '/video-archive.html',
        destination: '/video-archive',
        permanent: true,
      },
      {
        source: '/contact.html',
        destination: '/contact',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
