
/** @type {import('next').NextConfig} */

const storageBaseUrl = process.env.NEXT_PUBLIC_STORAGE_BASE_URL;

const storageRemotePattern = storageBaseUrl
  ? (() => {
      const url = new URL(storageBaseUrl);
      const pathname = url.pathname.replace(/\/$/, "");

      return {
        protocol: url.protocol.slice(0, -1),
        hostname: url.hostname,
        port: url.port,
        pathname: `${pathname}/**`,
      };
    })()
  : null;

const nextConfig = {
  images: {
    qualities: [90],
    remotePatterns: storageRemotePattern
      ? [storageRemotePattern]
      : [],
  },
};

export default nextConfig;
