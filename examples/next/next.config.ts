import { addSvelteBridge } from "svelte-in-react/webpack";
import type { Configuration } from 'webpack';

const nextConfig = {
  webpack: (config: Configuration, context: any) => {
    addSvelteBridge(config, context);
    return config;
  },
};

export default nextConfig;
