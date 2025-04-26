import { configureSvelteForWebpack } from "svelte-in-react/webpack";
import type { Configuration } from "webpack";

const nextConfig = {
	webpack: (config: Configuration, context: any) => {
		configureSvelteForWebpack(config, context);
		return config;
	},
};

export default nextConfig;
