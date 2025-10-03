import crypto from 'crypto';
import path from 'path';

import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { qrcode } from 'vite-plugin-qrcode';
import svgr from 'vite-plugin-svgr';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';
import tsconfigPaths from 'vite-tsconfig-paths';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FALLBACK_DEV_PORT = 5173;
const PREVIEW_PORT = 8080;
const MAX_CSS_MODULE_NAME_LENGTH = 5;

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());

  let shouldUseSourceMap = false;
  if (command === 'serve') {
    shouldUseSourceMap = true;
  }

  return {
    appType: 'spa',
    build: {
      reportCompressedSize: true,
      sourcemap: shouldUseSourceMap,
      // rollupOptions: {
      //   external: ['lucid-cardano'],
      // }
    },
    cacheDir: 'node_modules/.vite',
    clearScreen: true,
    css: {
      devSourcemap: true,
      modules: {
        generateScopedName: (name, filename, css): string => {
          if (command === 'serve') {
            const fileBasename = path.basename(filename);
            const cleanFilename = fileBasename.replace(/\..*$/, '');
            return `${cleanFilename}__${name}`;
          }
          const hash = crypto
            .createHash('md5')
            .update(css)
            .digest('base64')
            .slice(-MAX_CSS_MODULE_NAME_LENGTH);
          return hash;
        },
        localsConvention: 'camelCase',
        scopeBehaviour: 'local',
      },
      transformer: 'postcss',
    },
    json: {
      namedExports: true,
      stringify: false,
    },
    logLevel: 'info',
    optimizeDeps: {
      esbuildOptions: { target: 'esnext' },
      exclude: ['lucid-cardano'],
    },
    plugins: [
      wasm(),
      topLevelAwait(),
      react({
        devTarget: 'esnext',
      }),
      svgr(),
      tsconfigPaths(),
      qrcode(),
      // nodePolyfills(),
    ],
    preview: {
      host: true,
      port: PREVIEW_PORT,
      strictPort: true,
    },
    publicDir: 'public',
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src'),
        },
        { find: 'node-fetch', replacement: 'isomorphic-fetch' },
        { find: 'stream', replacement: 'stream-browserify' },
      ],
    },
    server: {
      hmr: {
        overlay: true,
      },
      host: true,
      port: +env.VITE_PORT || FALLBACK_DEV_PORT,
      strictPort: true,
    },
  };
});
