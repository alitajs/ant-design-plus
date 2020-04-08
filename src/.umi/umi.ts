import './core/polyfill';
import '@@/core/devScripts';
import { plugin } from './core/plugin';
import { createHistory } from './core/history';
import { ApplyPluginsType } from '/Users/wxk/Documents/project/alita/ant-design-plus/node_modules/@umijs/runtime';
import { renderClient } from '/Users/wxk/Documents/project/alita/ant-design-plus/node_modules/@umijs/renderer-react/dist/index.js';

const getClientRender = (args: { hot?: boolean } = {}) =>
  plugin.applyPlugins({
    key: 'render',
    type: ApplyPluginsType.compose,
    initialValue: () => {
      return renderClient({
        // @ts-ignore
        routes: require('./core/routes').routes,
        plugin,
        history: createHistory(args.hot),
        rootElement: 'root',
        defaultTitle: 'Ant Design Plus'
      });
    },
    args
  });

const clientRender = getClientRender();
export default clientRender();

window.g_umi = {
  version: '3.1.0'
};

// hot module replacement
// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('./core/routes', () => {
    getClientRender({ hot: true })();
  });
}
