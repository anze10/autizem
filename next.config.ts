// import type { NextConfig } from "next";

<<<<<<< HEAD
// const nextConfig: NextConfig = {
//     /* config options here */
// };
=======
const nextConfig: NextConfig = {
    experimental: {
        dynamicIO: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.googleusercontent.com',
                port: '',
                search: '',
            },
        ],
    },
};
>>>>>>> test

// export default nextConfig;
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// import "./src/env.js";

// /** @type {import("next").NextConfig} */
// const config = {};

// export default config;
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config: any) => {
      config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
      return config;
    },
    images: {
      remotePatterns: [
        {
          hostname: "lh3.googleusercontent.com",
        },
      ],
    },
  };
  
  export default nextConfig;
  