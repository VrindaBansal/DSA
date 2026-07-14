/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lesson MDX is read from /content with fs at render time. Static routes
  // bake it in at build; the dynamic ones (searchParams) read it on demand,
  // so the content tree must ship inside the serverless bundle on Vercel.
  outputFileTracingIncludes: {
    '/lesson/[slug]': ['./content/**/*'],
    '/lesson/[slug]/cheatsheet': ['./content/**/*'],
    '/module/[slug]': ['./content/**/*'],
    '/practice': ['./content/**/*'],
    '/practice/code': ['./content/**/*'],
    '/review': ['./content/**/*'],
    '/reference': ['./content/**/*'],
    '/': ['./content/**/*'],
  },
};

export default nextConfig;
