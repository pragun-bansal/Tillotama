// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Image configuration to allow external domains
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/a/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
                port: '',
                pathname: '/**',
            }
        ],
        // Alternative domains format (if the above doesn't work)
        domains: [
            'lh3.googleusercontent.com',
            'res.cloudinary.com',
            'images.unsplash.com',
            'via.placeholder.com',
            'i.ibb.co'
        ],
    },

    // Experimental features
    experimental: {
        // Enable if you're using app directory
        appDir: true,
        // Reduce memory usage during builds
        memoryBasedWorkers: true,
    },

    // Webpack configuration
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Fix for potential module resolution issues
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            net: false,
            tls: false,
            crypto: false,
        };

        return config;
    },

    // Environment variables
    env: {
        CUSTOM_KEY: process.env.CUSTOM_KEY,
    },

    // Headers for security and CORS
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
                    { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
                ],
            },
        ];
    },

    // Redirects
    async redirects() {
        return [
            // Add any redirects you need
        ];
    },

    // Rewrites
    async rewrites() {
        return [
            // Add any rewrites you need
        ];
    },

    // TypeScript configuration
    typescript: {
        // Set to true if you want production builds to continue even if there are type errors
        ignoreBuildErrors: false,
    },

    // ESLint configuration
    eslint: {
        // Set to true if you want production builds to continue even if there are ESLint errors
        ignoreDuringBuilds: false,
    },

    // Output configuration
    output: 'standalone', // Use this if deploying to serverless platforms

    // Compression
    compress: true,

    // Power by header
    poweredByHeader: false,

    // React strict mode
    reactStrictMode: true,

    // SWC minification
    swcMinify: true,
};

module.exports = nextConfig;