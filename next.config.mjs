// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };
// export default nextConfig;

// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
// });
// module.exports = withPWA({
//   // next.js config
// });

import withPWA from "next-pwa";

const withPwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
};

export default withPWA(withPwaConfig);
