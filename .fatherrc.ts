import { IBundleOptions } from 'father';
import { resolve } from 'path';

// @ts-ignore
const options: IBundleOptions = {
  esm: 'rollup',
  cjs: 'rollup',
  entry: 'components/index.ts',
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  doc: {
    base: '/ant-design-plus/',
    title: 'ant-design-plus',
    description: 'react components',
    modifyBundlerConfig: (config) => {
      config['resolve'].alias = Object.assign({}, config['resolve'].alias, {
        '@': resolve(__dirname, 'src'),
      });
      return config;
    },
    public: 'docs/public',
    indexHtml: './docs/index.html',
    themeConfig: {
      repository: 'https://github.com/alitajs/ant-design-plus',
      styles: {
        container: {
          fontSize: 16,
        },
      }
    },
    menu: [
      'Overview',
      'Components'
    ]
  },
};

export default options;
