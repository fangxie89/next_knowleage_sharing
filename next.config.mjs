/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
        {
            source: '/vue',
            destination: '/vue/essentials/watcher',
            permanent: true
        },
        {
            source: '/nuxt',
            destination: '/nuxt/discover-javascript-timers',
            permanent: true
        },
        {
            source: '/react',
            destination: '/react/hooks/stateManagement',
            permanent: true
        },
        {
            source: '/next',
            destination: '/next/discover-javascript-timers',
            permanent: true
        }
    ]
}
};

export default nextConfig;
