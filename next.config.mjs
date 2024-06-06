/** @type {import('next').NextConfig} */
const nextConfig = {
  // allow external image from pexels
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com"
      }
    ]
  }
}

export default nextConfig
