/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: function (config, { webpack }) {
        // Next.js WebPack Bundler does not know how to handle `.mjs` files on `node_modules`
        // This is not an issue when using TurboPack as it uses SWC and it is ESM-only
        // Once Next.js uses Turbopack for their build process we can remove this
        config.module.rules.push({
          test: /\.m?js$/,
          type: 'javascript/auto',
          resolve: { fullySpecified: false },
        });
    
        return config;
      },
      experimental: {
        // Some of our static pages from `getStaticProps` have a lot of data
        // since we pass the fully-compiled MDX page from `MDXRemote` through
        // a page's static props.
        largePageDataBytes: 128 * 100000,
        // A list of packages that Next.js should automatically evaluate and optimise the imports for.
        // @see https://vercel.com/blog/how-we-optimized-package-imports-in-next-js
        optimizePackageImports: [
          'tailwindcss',
          'shiki',
        ],
        // Removes the warning regarding the WebPack Build Worker
        webpackBuildWorker: true,
      },
      // To import ESM-only packages with next dev --turbo. Source: https://github.com/vercel/next.js/issues/63318#issuecomment-2079677098
      transpilePackages: ['shiki'],
    async redirects() {
        return [
        {
            source: '/vue',
            destination: '/soon',
            permanent: true
        },
        {
            source: '/nuxt',
            destination: '/soon',
            permanent: true
        },
        {
            source: '/react',
            destination: '/react/hooks/stateManagement',
            permanent: true
        },
        {
            source: '/next',
            destination: '/soon',
            permanent: true
        },
        {
            source: '/blog',
            destination: '/blog/all',
            permanent: true
        },
    ]
}
};

export default nextConfig;
