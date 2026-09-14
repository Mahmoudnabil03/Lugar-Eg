/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Legacy language-prefixed URLs (previously advertised in metadata
      // alternates but never existed as routes) redirect home instead of 404.
      { source: "/ar", destination: "/", permanent: false },
      { source: "/en", destination: "/", permanent: false },
      { source: "/ar/:path*", destination: "/", permanent: false },
      { source: "/en/:path*", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
