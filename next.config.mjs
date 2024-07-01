/** @type {import('next').NextConfig} */

console.log()
const nextConfig = {
    env: {
        API_URL: process.env.API_BACK_URL,
        BACK_URL: process.env.NEXT_PUBLIC_BACK_URL,
    },
    // experimental: {
    //     appDir: true,
    // }
};

export default nextConfig;
