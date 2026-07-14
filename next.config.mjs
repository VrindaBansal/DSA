/** @type {import('next').NextConfig} */
const nextConfig = {
  // Content is read from /content at request time in dev; lesson pages are
  // statically generated at build. Nothing exotic needed here.
  outputFileTracingIncludes: {
    '/lesson/[slug]': ['./content/**/*'],
    '/module/[slug]': ['./content/**/*'],
  },
};

export default nextConfig;
