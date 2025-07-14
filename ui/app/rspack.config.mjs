import { resolve } from 'node:path';
import rspack from '@rspack/core';
import refreshPlugin from '@rspack/plugin-react-refresh';
import TerserPlugin from 'terser-webpack-plugin';
import { defineConfig } from '@rspack/cli';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  output: {
    path: resolve(import.meta.dirname, './dist'),
    publicPath: isDev ? undefined : 'PREFIX_PATH_PLACEHOLDER/',
  },
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-source-map' : false,
  entry: './src/bundle.ts',
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
  },
  experiments: {
    css: true,
  },
  optimization: {
    minimizer: [new TerserPlugin(), new rspack.LightningCssMinimizerRspackPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset',
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: {
                targets: ['chrome >= 87', 'edge >= 88', 'firefox >= 78', 'safari >= 14'],
              },
            },
          },
        ],
      },
    ],
  },
  // Add watch options to limit file watching
  watchOptions: isDev
    ? {
        ignored: [
          '**/node_modules/**',
          '**/dist/**',
          '**/.git/**',
          '**/coverage/**',
          '**/*.log',
          '**/temp/**',
          '**/tmp/**',
        ],
        aggregateTimeout: 300,
        poll: false,
      }
    : undefined,
  devServer: isDev
    ? {
        historyApiFallback: true,
        port: parseInt(process.env.PORT ?? '5999'),
        host: 'bb.test',
        allowedHosts: 'all',
        watchFiles: {
          paths: ['src/**/*'],
          options: {
            ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**', '**/coverage/**'],
          },
        },
        proxy: [
          {
            context: ['/api', '/proxy', '/plugins', '/observe/api', '/observe/proxy', '/observe/plugins'],
            target: 'http://localhost:8080',
            pathRewrite: {
              '^/observe/api': '/api',
              '^/observe/proxy': '/proxy',
              '^/observe/plugins': '/plugins',
            },
          },
        ],
        client: {
          // By default, the error overlay is not shown because it can get in the
          // way of e2e tests and can be annoying for some developer workflows.
          // If you like the overlay, you can enable it by setting the the specified
          // env var.
          overlay: process.env.ERROR_OVERLAY === 'true',
        },
      }
    : undefined,
  plugins: [
    new rspack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new rspack.ProgressPlugin({}),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
      favicon: './favicon.ico',
      publicPath: isDev ? '/' : 'PREFIX_PATH_PLACEHOLDER/',
    }),
    isDev ? new refreshPlugin() : null,
  ].filter(Boolean),
});
