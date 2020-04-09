import { join } from 'path';

export default {
  mode: 'site',
  title: 'Ant Design Plus',
  favicon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  navs: {
    'zh-CN': [null, { title: 'GitHub', path: 'https://github.com/alitajs/ant-design-plus/' }],
    'en-US': [null, { title: 'GitHub', path: 'https://github.com/alitajs/ant-design-plus/' }]
  },
  dynamicImport: {},
  hash: true,
  plugins: [join(__dirname, './plugins/umi-plugin-antd-plus.ts')],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
      }
    ]
  ]
};
