export default {
  esm: 'babel',
  cjs: 'babel',
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
    title: 'ant-design-plus',
    base: '/ant-design-plus/',
    description: '',
    repository: 'https://github.com/alitajs/ant-design-plus',
    ordering: 'ascending',
    indexHtml: './docs/index.html',
    themeConfig: {
      repository: 'https://github.com/alitajs/ant-design-plus',
      styles: {
        container: {
          fontSize: 16,
        },
      },
      colors: {
        // primary: '',
      },
    },
    // menu: ['Overview'],
  },
};
