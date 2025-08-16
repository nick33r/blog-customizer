import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Для использования __dirname в ES-модулях
const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-styling-webpack',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.css$/,
            sideEffects: true,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    auto: true,
                  },
                },
              },
            ],
          },
          {
            test: /\.s[ac]ss$/,
            sideEffects: true,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    auto: true,
                  },
                  importLoaders: 2,
                },
              },
              'resolve-url-loader',
              {
                loader: 'sass-loader',
                options: {
                  implementation: 'sass',
                  sourceMap: true,
                  sassOptions: {},
                },
              },
            ],
          },
        ],
      },
    },
    '@storybook/addon-webpack5-compiler-swc'
  ],
  webpackFinal: async (config) => {
    if (config?.resolve?.alias) {
      config.resolve.alias = {
        fonts: path.resolve(__dirname, '..', './src/fonts'),
        src: path.resolve(__dirname, '..', './src'),
        components: path.resolve(__dirname, '..', './src/components'),
      };
    }
    return config;
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),
  docs: {
    autodocs: 'tag',
  },
};

export default config;