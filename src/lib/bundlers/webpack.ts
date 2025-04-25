import path from "path";

const prod = process.env.NODE_ENV === "production";

function getSvelteLoaderOptions({ isServer }: { isServer: boolean }) {
  return {
    compilerOptions: {
      dev: !prod, // Default: false
      generate: isServer ? "ssr" : "dom", // for example, SSR can be enabled here
    },
    emitCss: prod, // Default: false
    hotReload: !prod, // Default: false
  };
}

export function getSvelteLoaders({
  isServer,
  defaultLoaders,
}: {
  isServer: boolean;
  defaultLoaders: {
    babel: any;
  };
}) {
  const svelteLoaderOptions = getSvelteLoaderOptions({ isServer });

  return [
    // The following two loader entries are only needed if you use Svelte 5+ with TypeScript.
    // Also make sure your tsconfig.json includes `"target": "ESNext"` in order to not downlevel syntax
    {
      test: /\.svelte\.ts$/,
      use: [
        {
          loader: "svelte-loader",
          options: svelteLoaderOptions,
        },
        defaultLoaders.babel,
      ],
    },
    // This is the config for other .ts files - the regex makes sure to not process .svelte.ts files twice
    // {
    //   test: /(?<!\.svelte)\.ts$/,
    //   loader: "ts-loader",
    // },
    {
      // Svelte 5+:
      test: /\.(svelte|svelte\.js)$/,
      use: [
        {
          loader: "svelte-loader",
          options: svelteLoaderOptions,
        },
      ],
    },
    {
      // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
      test: /node_modules\/svelte\/.*\.mjs$/,
      resolve: {
        fullySpecified: false,
      },
    },
  ];
}

export function addSvelteLoaders(
  config: any,
  context: { isServer: boolean; defaultLoaders: { babel: any } }
) {
  const svelteLoaders = getSvelteLoaders(context);
  config.module.rules.push(...svelteLoaders);
}

export function addSvelteAliases(
  config: any,
  context: { isServer: boolean },
  { cwd = process.cwd() }: { cwd?: string } = {}
) {
  if (!context.isServer) {
    config.resolve.alias["svelte$"] = path.resolve(
      cwd,
      "node_modules",
      "svelte"
    );
    config.resolve.alias["svelte/*"] = path.resolve(
      cwd,
      "node_modules",
      "svelte/*"
    );
  }
}

export function addSvelteBridge(
  config: any,
  context: { isServer: boolean; defaultLoaders: { babel: any } },
  options: { cwd?: string } = {}
) {
  addSvelteAliases(config, context, options);
  addSvelteLoaders(config, context);
}
