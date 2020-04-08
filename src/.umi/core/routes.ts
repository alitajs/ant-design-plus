import {
  ApplyPluginsType,
  dynamic
} from '/Users/wxk/Documents/project/alita/ant-design-plus/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    path: '/_demos/simple',
    component: dynamic({
      loader: () =>
        import(/* webpackChunkName: 'fit-text__demo__simple' */ '../../fit-text/demo/simple.tsx')
    })
  },
  {
    path: '/_demos/fixed-width',
    component: dynamic({
      loader: () =>
        import(
          /* webpackChunkName: 'fit-text__demo__fixed-width' */ '../../fit-text/demo/fixed-width.tsx'
        )
    })
  },
  {
    path: '/_demos/simple-1',
    component: dynamic({
      loader: () =>
        import(/* webpackChunkName: 'send-code__demo__simple' */ '../../send-code/demo/simple.tsx')
    })
  },
  {
    path: '/',
    component: (props) =>
      require('react').createElement(
        require('/Users/wxk/Documents/project/alita/ant-design-plus/node_modules/@umijs/preset-dumi/lib/themes/default/layout.js')
          .default,
        {
          ...{
            menus: {
              'en-US': {
                '/components': [
                  {
                    title: '数据展示',
                    path: '/components/data-display',
                    meta: { order: 2 },
                    children: [
                      { path: '/components/data-display/fit-text', title: 'FitText', meta: {} },
                      {
                        path: '/components/data-display/scrollable-bar',
                        title: 'ScrollableBar',
                        meta: {}
                      }
                    ]
                  },
                  {
                    title: '操作组件',
                    path: '/components/operation',
                    meta: { order: 99 },
                    children: [
                      {
                        path: '/components/operation/send-code',
                        title: 'SendCode 发送验证码',
                        meta: {}
                      },
                      {
                        path: '/components/operation/button-list',
                        title: 'ButtonList 操作项',
                        meta: {}
                      },
                      {
                        path: '/components/operation/full-screen',
                        title: 'FullScreen 异常组件',
                        meta: {}
                      },
                      {
                        path: '/components/operation/error-boundary',
                        title: 'ErrorBoundary 异常组件',
                        meta: {}
                      }
                    ]
                  },
                  {
                    title: '其他',
                    path: '/components/other',
                    meta: { order: 100 },
                    children: [
                      {
                        path: '/components/other/authorized',
                        title: 'Authorized 权限组件',
                        meta: {}
                      }
                    ]
                  }
                ],
                '*': [{ path: '/', title: 'Ant Design Plus', meta: {} }],
                '/guide': [
                  { path: '/guide/getting-started', title: '前序准备', meta: { order: 1 } },
                  { path: '/guide/faq', title: '常见问题', meta: {} },
                  { path: '/guide/i18n', title: '多语言', meta: {} },
                  { path: '/guide/contributing', title: '贡献指南', meta: {} }
                ]
              },
              'zh-CN': {
                '/zh-CN/components': [
                  {
                    title: '数据展示',
                    path: '/zh-CN/components/data-display',
                    meta: { order: 2 },
                    children: [
                      {
                        path: '/zh-CN/components/data-display/fit-text',
                        title: 'FitText',
                        meta: {}
                      },
                      {
                        path: '/zh-CN/components/data-display/scrollable-bar',
                        title: 'ScrollableBar',
                        meta: {}
                      }
                    ]
                  },
                  {
                    title: '操作组件',
                    path: '/zh-CN/components/operation',
                    meta: { order: 99 },
                    children: [
                      {
                        path: '/zh-CN/components/operation/send-code',
                        title: 'SendCode 发送验证码',
                        meta: {}
                      },
                      {
                        path: '/zh-CN/components/operation/button-list',
                        title: 'ButtonList 操作项',
                        meta: {}
                      },
                      {
                        path: '/zh-CN/components/operation/full-screen',
                        title: 'FullScreen 异常组件',
                        meta: {}
                      },
                      {
                        path: '/zh-CN/components/operation/error-boundary',
                        title: 'ErrorBoundary 异常组件',
                        meta: {}
                      }
                    ]
                  },
                  {
                    title: '其他',
                    path: '/zh-CN/components/other',
                    meta: { order: 100 },
                    children: [
                      {
                        path: '/zh-CN/components/other/authorized',
                        title: 'Authorized 权限组件',
                        meta: {}
                      }
                    ]
                  }
                ],
                '*': [{ path: '/zh-CN', title: 'Ant Design Plus', meta: {} }],
                '/zh-CN/guide': [
                  { path: '/zh-CN/guide/getting-started', title: '前序准备', meta: { order: 1 } },
                  { path: '/zh-CN/guide/faq', title: '常见问题', meta: {} },
                  { path: '/zh-CN/guide/i18n', title: '多语言', meta: {} },
                  { path: '/zh-CN/guide/contributing', title: '贡献指南', meta: {} }
                ]
              }
            },
            locales: [
              { name: 'en-US', label: 'English' },
              { name: 'zh-CN', label: '中文' }
            ],
            navs: {
              'en-US': [
                { path: '/guide', title: '指南', order: 1 },
                { title: '组件', path: '/components' },
                { title: 'GitHub', path: 'https://github.com/alitajs/ant-design-plus/' }
              ],
              'zh-CN': [
                { path: '/zh-CN/guide', title: '指南', order: 1 },
                { title: '组件', path: '/zh-CN/components' },
                { title: 'GitHub', path: 'https://github.com/alitajs/ant-design-plus/' }
              ]
            },
            title: 'Ant Design Plus',
            logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            mode: 'site',
            repoUrl: 'https://github.com/alitajs/ant-design-plus'
          },
          ...props
        }
      ),
    routes: [
      {
        path: '/components/other/authorized',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'authorized__index.en-US.md' */ '../../authorized/index.en-US.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'src/authorized/index.en-US.md',
          updatedTime: null,
          title: 'Authorized 权限组件',
          nav: {
            title: '组件',
            path: '/components'
          },
          group: {
            title: '其他',
            path: '/components/other',
            order: 100
          },
          slugs: [
            {
              depth: 1,
              value: 'Authorized 权限组件',
              heading: 'authorized-权限组件'
            },
            {
              depth: 2,
              value: 'API',
              heading: 'api'
            },
            {
              depth: 3,
              value: 'Authorized',
              heading: 'authorized'
            }
          ],
          locale: 'en-US'
        },
        title: 'Authorized 权限组件'
      },
      {
        path: '/zh-CN/components/other/authorized',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'authorized__index.zh-CN.md' */ '../../authorized/index.zh-CN.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'src/authorized/index.zh-CN.md',
          updatedTime: null,
          title: 'Authorized 权限组件',
          nav: {
            title: '组件',
            path: '/zh-CN/components'
          },
          group: {
            title: '其他',
            path: '/zh-CN/components/other',
            order: 100
          },
          slugs: [
            {
              depth: 1,
              value: 'Authorized 权限组件',
              heading: 'authorized-权限组件'
            },
            {
              depth: 2,
              value: 'API',
              heading: 'api'
            },
            {
              depth: 3,
              value: 'Authorized',
              heading: 'authorized'
            }
          ],
          locale: 'zh-CN'
        },
        title: 'Authorized 权限组件'
      },
      {
        path: '/components/operation/button-list',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'button-list__index.en-US.md' */ '../../button-list/index.en-US.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'src/button-list/index.en-US.md',
          updatedTime: null,
          title: 'ButtonList 操作项',
          nav: {
            title: '组件',
            path: '/components'
          },
          group: {
            title: '操作组件',
            path: '/components/operation',
            order: 99
          },
          slugs: [
            {
              depth: 2,
              value: 'API',
              heading: 'api'
            },
            {
              depth: 3,
              value: 'ButtonList',
              heading: 'buttonlist'
            }
          ],
          locale: 'en-US'
        },
        title: 'ButtonList 操作项'
      },
      {
        path: '/zh-CN/components/operation/button-list',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'button-list__index.zh-CN.md' */ '../../button-list/index.zh-CN.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'src/button-list/index.zh-CN.md',
          updatedTime: null,
          title: 'ButtonList 操作项',
          nav: {
            title: '组件',
            path: '/zh-CN/components'
          },
          group: {
            title: '操作组件',
            path: '/zh-CN/components/operation',
            order: 99
          },
          slugs: [
            {
              depth: 2,
              value: 'API',
              heading: 'api'
            },
            {
              depth: 3,
              value: 'ButtonList',
              heading: 'buttonlist'
            }
          ],
          locale: 'zh-CN'
        },
        title: 'ButtonList 操作项'
      },
      {
        path: '/components/operation/error-boundary',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'error-boundary__index.en-US.md' */ '../../error-boundary/index.en-US.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'src/error-boundary/index.en-US.md',
          updatedTime: null,
          title: 'ErrorBoundary 异常组件',
          nav: {
            title: '组件',
            path: '/components'
          },
          group: {
            title: '操作组件',
            path: '/components/operation',
            order: 99
          },
          slugs: [
            {
              depth: 1,
              value: 'ErrorBoundary 异常组件',
              heading: 'errorboundary-异常组件'
            },
            {
              depth: 2,
              value: 'API',
              heading: 'api'
            },
            {
              depth: 3,
              value: 'ErrorBoundary',
              heading: 'errorboundary'
            }
          ],
          locale: 'en-US'
        },
        title: 'ErrorBoundary 异常组件'
      },
      {
        path: '/zh-CN/components/operation/error-boundary',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'error-boundary__index.zh-CN.md' */ '../../error-boundary/index.zh-CN.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'src/error-boundary/index.zh-CN.md',
          updatedTime: null,
          title: 'ErrorBoundary 异常组件',
          nav: {
            title: '组件',
            path: '/zh-CN/components'
          },
          group: {
            title: '操作组件',
            path: '/zh-CN/components/operation',
            order: 99
          },
          slugs: [
            {
              depth: 1,
              value: 'ErrorBoundary 异常组件',
              heading: 'errorboundary-异常组件'
            },
            {
              depth: 2,
              value: 'API',
              heading: 'api'
            },
            {
              depth: 3,
              value: 'ErrorBoundary',
              heading: 'errorboundary'
            }
          ],
          locale: 'zh-CN'
        },
        title: 'ErrorBoundary 异常组件'
      },
      {
        path: '/components/data-display/fit-text',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'fit-text__index.en-US.md' */ '../../fit-text/index.en-US.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'src/fit-text/index.en-US.md',
          updatedTime: null,
          title: 'FitText',
          nav: {
            title: '组件',
            path: '/components'
          },
          group: {
            title: '数据展示',
            path: '/components/data-display'
          },
          slugs: [
            {
              depth: 1,
              value: 'FitText',
              heading: 'fittext'
            },
            {
              depth: 2,
              value: '代码演示',
              heading: '代码演示'
            },
            {
              depth: 2,
              value: 'API',
              heading: 'api'
            }
          ],
          locale: 'en-US'
        },
        title: 'FitText'
      },
      {
        path: '/zh-CN/components/data-display/fit-text',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'fit-text__index.zh-CN.md' */ '../../fit-text/index.zh-CN.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'src/fit-text/index.zh-CN.md',
          updatedTime: null,
          title: 'FitText',
          nav: {
            title: '组件',
            path: '/zh-CN/components'
          },
          group: {
            title: '数据展示',
            path: '/zh-CN/components/data-display'
          },
          slugs: [
            {
              depth: 2,
              value: '代码演示',
              heading: '代码演示'
            },
            {
              depth: 2,
              value: 'API',
              heading: 'api'
            },
            {
              depth: 3,
              value: 'FitText',
              heading: 'fittext'
            }
          ],
          locale: 'zh-CN'
        },
        title: 'FitText'
      },
      {
        path: '/components/operation/full-screen',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'full-screen__index.en-US.md' */ '../../full-screen/index.en-US.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'src/full-screen/index.en-US.md',
          updatedTime: null,
          title: 'FullScreen 异常组件',
          nav: {
            title: '组件',
            path: '/components'
          },
          group: {
            title: '操作组件',
            path: '/components/operation',
            order: 99
          },
          slugs: [
            {
              depth: 2,
              value: 'API',
              heading: 'api'
            },
            {
              depth: 3,
              value: 'FullScreen',
              heading: 'fullscreen'
            }
          ],
          locale: 'en-US'
        },
        title: 'FullScreen 异常组件'
      },
      {
        path: '/zh-CN/components/operation/full-screen',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'full-screen__index.zh-CN.md' */ '../../full-screen/index.zh-CN.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'src/full-screen/index.zh-CN.md',
          updatedTime: null,
          title: 'FullScreen 异常组件',
          nav: {
            title: '组件',
            path: '/zh-CN/components'
          },
          group: {
            title: '操作组件',
            path: '/zh-CN/components/operation',
            order: 99
          },
          slugs: [
            {
              depth: 2,
              value: 'API',
              heading: 'api'
            },
            {
              depth: 3,
              value: 'FullScreen',
              heading: 'fullscreen'
            }
          ],
          locale: 'zh-CN'
        },
        title: 'FullScreen 异常组件'
      },
      {
        path: '/components/data-display/scrollable-bar',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'scrollable-bar__index.en-US.md' */ '../../scrollable-bar/index.en-US.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'src/scrollable-bar/index.en-US.md',
          updatedTime: null,
          title: 'ScrollableBar',
          nav: {
            title: '组件',
            path: '/components'
          },
          group: {
            title: '数据展示',
            path: '/components/data-display',
            order: 2
          },
          slugs: [
            {
              depth: 2,
              value: 'API',
              heading: 'api'
            },
            {
              depth: 3,
              value: 'ScrollableBar',
              heading: 'scrollablebar'
            }
          ],
          locale: 'en-US'
        },
        title: 'ScrollableBar'
      },
      {
        path: '/zh-CN/components/data-display/scrollable-bar',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'scrollable-bar__index.zh-CN.md' */ '../../scrollable-bar/index.zh-CN.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'src/scrollable-bar/index.zh-CN.md',
          updatedTime: null,
          title: 'ScrollableBar',
          nav: {
            title: '组件',
            path: '/zh-CN/components'
          },
          group: {
            title: '数据展示',
            path: '/zh-CN/components/data-display',
            order: 2
          },
          slugs: [
            {
              depth: 2,
              value: 'API',
              heading: 'api'
            },
            {
              depth: 3,
              value: 'ScrollableBar',
              heading: 'scrollablebar'
            }
          ],
          locale: 'zh-CN'
        },
        title: 'ScrollableBar'
      },
      {
        path: '/components/operation/send-code',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'send-code__index.en-US.md' */ '../../send-code/index.en-US.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'src/send-code/index.en-US.md',
          updatedTime: null,
          title: 'SendCode 发送验证码',
          nav: {
            title: '组件',
            path: '/components'
          },
          group: {
            title: '操作组件',
            path: '/components/operation'
          },
          slugs: [
            {
              depth: 2,
              value: '代码演示',
              heading: '代码演示'
            },
            {
              depth: 2,
              value: 'API',
              heading: 'api'
            },
            {
              depth: 3,
              value: 'SendCode',
              heading: 'sendcode'
            }
          ],
          locale: 'en-US'
        },
        title: 'SendCode 发送验证码'
      },
      {
        path: '/zh-CN/components/operation/send-code',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'send-code__index.zh-CN.md' */ '../../send-code/index.zh-CN.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'src/send-code/index.zh-CN.md',
          updatedTime: null,
          title: 'SendCode 发送验证码',
          nav: {
            title: '组件',
            path: '/zh-CN/components'
          },
          group: {
            title: '操作组件',
            path: '/zh-CN/components/operation'
          },
          slugs: [
            {
              depth: 2,
              value: '代码演示',
              heading: '代码演示'
            },
            {
              depth: 2,
              value: 'API',
              heading: 'api'
            },
            {
              depth: 3,
              value: 'SendCode',
              heading: 'sendcode'
            }
          ],
          locale: 'zh-CN'
        },
        title: 'SendCode 发送验证码'
      },
      {
        path: '/',
        component: dynamic({
          loader: () =>
            import(/* webpackChunkName: 'docs__index.en-US.md' */ '../../../docs/index.en-US.md')
        }),
        exact: true,
        meta: {
          filePath: 'docs/index.en-US.md',
          updatedTime: null,
          title: 'Ant Design Plus',
          hero: {
            title: 'Ant Design Plus',
            desc: '<div class="markdown"><p>提炼于真实场景的业务组件，为提效而生。</p></div>',
            actions: [
              {
                text: '快速上手 →',
                link: '/guide/getting-started'
              }
            ]
          },
          features: [
            {
              icon:
                'https://gw.alipayobjects.com/zos/basement_prod/b54b48c7-087a-4984-b150-bcecb40920de/k7787z07_w114_h120.png',
              title: '开箱即用',
              desc: '<div class="markdown"><p>提供 Umi 插件，做到开箱即用。</p></div>'
            },
            {
              icon:
                'https://gw.alipayobjects.com/zos/basement_prod/201bea40-cf9d-4be2-a1d8-55bec136faf2/k7788a8s_w102_h120.png',
              title: '高质量',
              desc: '<div class="markdown"><p>基于 Ant Design，保证了组件的质量。</p></div>'
            },
            {
              icon:
                'https://gw.alipayobjects.com/zos/bmw-prod/6319a122-e8b8-497f-9b45-37cfbe77edaa/k7htfx7t_w144_h144.png',
              title: '生成可用',
              desc: '<div class="markdown"><p>基于平时业务积累，已在公司生产上验证。</p></div>'
            }
          ],
          footer: '<div class="markdown"><p>Alita Team | Copyright © 2020-present</p></div>',
          slugs: [
            {
              depth: 2,
              value: '快速上手',
              heading: '快速上手'
            }
          ],
          locale: 'en-US'
        },
        title: 'Ant Design Plus'
      },
      {
        path: '/zh-CN',
        component: dynamic({
          loader: () =>
            import(/* webpackChunkName: 'docs__index.zh-CN.md' */ '../../../docs/index.zh-CN.md')
        }),
        exact: true,
        meta: {
          filePath: 'docs/index.zh-CN.md',
          updatedTime: null,
          title: 'Ant Design Plus',
          hero: {
            title: 'Ant Design Plus',
            desc: '<div class="markdown"><p>提炼于真实场景的业务组件，为提效而生。</p></div>',
            actions: [
              {
                text: '快速上手 →',
                link: '/zh-CN/guide/getting-started'
              }
            ]
          },
          features: [
            {
              icon:
                'https://gw.alipayobjects.com/zos/basement_prod/b54b48c7-087a-4984-b150-bcecb40920de/k7787z07_w114_h120.png',
              title: '开箱即用',
              desc: '<div class="markdown"><p>提供 Umi 插件，做到开箱即用。</p></div>'
            },
            {
              icon:
                'https://gw.alipayobjects.com/zos/basement_prod/201bea40-cf9d-4be2-a1d8-55bec136faf2/k7788a8s_w102_h120.png',
              title: '高质量',
              desc: '<div class="markdown"><p>基于 Ant Design，保证了组件的质量。</p></div>'
            },
            {
              icon:
                'https://gw.alipayobjects.com/zos/bmw-prod/6319a122-e8b8-497f-9b45-37cfbe77edaa/k7htfx7t_w144_h144.png',
              title: '生成可用',
              desc: '<div class="markdown"><p>基于平时业务积累，已在公司生产上验证。</p></div>'
            }
          ],
          footer: '<div class="markdown"><p>Alita Team | Copyright © 2020-present</p></div>',
          slugs: [
            {
              depth: 2,
              value: '快速上手',
              heading: '快速上手'
            }
          ],
          locale: 'zh-CN'
        },
        title: 'Ant Design Plus'
      },
      {
        path: '/guide/contributing',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'docs__guide__contributing.en-US.md' */ '../../../docs/guide/contributing.en-US.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'docs/guide/contributing.en-US.md',
          updatedTime: null,
          slugs: [
            {
              depth: 1,
              value: '贡献指南',
              heading: '贡献指南'
            },
            {
              depth: 2,
              value: '请查看规范説明',
              heading: '请查看规范説明'
            },
            {
              depth: 2,
              value: '开发流程',
              heading: '开发流程'
            }
          ],
          title: '贡献指南',
          locale: 'en-US',
          nav: {
            path: '/guide',
            title: '指南'
          }
        },
        title: '贡献指南'
      },
      {
        path: '/zh-CN/guide/contributing',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'docs__guide__contributing.zh-CN.md' */ '../../../docs/guide/contributing.zh-CN.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'docs/guide/contributing.zh-CN.md',
          updatedTime: null,
          slugs: [
            {
              depth: 1,
              value: '贡献指南',
              heading: '贡献指南'
            },
            {
              depth: 2,
              value: '请查看规范説明',
              heading: '请查看规范説明'
            },
            {
              depth: 2,
              value: '开发流程',
              heading: '开发流程'
            }
          ],
          title: '贡献指南',
          locale: 'zh-CN',
          nav: {
            path: '/zh-CN/guide',
            title: '指南'
          }
        },
        title: '贡献指南'
      },
      {
        path: '/guide/faq',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'docs__guide__faq.en-US.md' */ '../../../docs/guide/faq.en-US.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'docs/guide/faq.en-US.md',
          updatedTime: null,
          slugs: [
            {
              depth: 1,
              value: '常见问题',
              heading: '常见问题'
            },
            {
              depth: 3,
              value: '如何使用 Ant Design Plus',
              heading: '如何使用-ant-design-plus'
            }
          ],
          title: '常见问题',
          locale: 'en-US',
          nav: {
            path: '/guide',
            title: '指南'
          }
        },
        title: '常见问题'
      },
      {
        path: '/zh-CN/guide/faq',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'docs__guide__faq.zh-CN.md' */ '../../../docs/guide/faq.zh-CN.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'docs/guide/faq.zh-CN.md',
          updatedTime: null,
          slugs: [
            {
              depth: 1,
              value: '常见问题',
              heading: '常见问题'
            },
            {
              depth: 3,
              value: '如何使用 Ant Design Plus',
              heading: '如何使用-ant-design-plus'
            }
          ],
          title: '常见问题',
          locale: 'zh-CN',
          nav: {
            path: '/zh-CN/guide',
            title: '指南'
          }
        },
        title: '常见问题'
      },
      {
        path: '/guide/getting-started',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'docs__guide__getting-started.en-US.md' */ '../../../docs/guide/getting-started.en-US.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'docs/guide/getting-started.en-US.md',
          updatedTime: null,
          order: 1,
          nav: {
            title: '指南',
            order: 1,
            path: '/guide'
          },
          slugs: [
            {
              depth: 2,
              value: '前序准备',
              heading: '前序准备'
            },
            {
              depth: 2,
              value: '安装',
              heading: '安装'
            },
            {
              depth: 2,
              value: '使用',
              heading: '使用'
            }
          ],
          title: '前序准备',
          locale: 'en-US'
        },
        title: '前序准备'
      },
      {
        path: '/zh-CN/guide/getting-started',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'docs__guide__getting-started.zh-CN.md' */ '../../../docs/guide/getting-started.zh-CN.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'docs/guide/getting-started.zh-CN.md',
          updatedTime: null,
          order: 1,
          nav: {
            title: '指南',
            order: 1,
            path: '/zh-CN/guide'
          },
          slugs: [
            {
              depth: 2,
              value: '前序准备',
              heading: '前序准备'
            },
            {
              depth: 2,
              value: '安装',
              heading: '安装'
            },
            {
              depth: 2,
              value: '使用',
              heading: '使用'
            }
          ],
          title: '前序准备',
          locale: 'zh-CN'
        },
        title: '前序准备'
      },
      {
        path: '/guide/i18n',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'docs__guide__i18n.en-US.md' */ '../../../docs/guide/i18n.en-US.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'docs/guide/i18n.en-US.md',
          updatedTime: null,
          slugs: [
            {
              depth: 1,
              value: '多语言',
              heading: '多语言'
            },
            {
              depth: 2,
              value: 'ConfigProvider',
              heading: 'configprovider'
            },
            {
              depth: 2,
              value: 'Ant Design Pro',
              heading: 'ant-design-pro'
            },
            {
              depth: 2,
              value: 'i18n 项目示例',
              heading: 'i18n-项目示例'
            }
          ],
          title: '多语言',
          locale: 'en-US',
          nav: {
            path: '/guide',
            title: '指南'
          }
        },
        title: '多语言'
      },
      {
        path: '/zh-CN/guide/i18n',
        component: dynamic({
          loader: () =>
            import(
              /* webpackChunkName: 'docs__guide__i18n.zh-CN.md' */ '../../../docs/guide/i18n.zh-CN.md'
            )
        }),
        exact: true,
        meta: {
          filePath: 'docs/guide/i18n.zh-CN.md',
          updatedTime: null,
          slugs: [
            {
              depth: 1,
              value: '多语言',
              heading: '多语言'
            },
            {
              depth: 2,
              value: 'ConfigProvider',
              heading: 'configprovider'
            },
            {
              depth: 2,
              value: 'Ant Design Pro',
              heading: 'ant-design-pro'
            },
            {
              depth: 2,
              value: 'i18n 项目示例',
              heading: 'i18n-项目示例'
            }
          ],
          title: '多语言',
          locale: 'zh-CN',
          nav: {
            path: '/zh-CN/guide',
            title: '指南'
          }
        },
        title: '多语言'
      },
      {
        path: '/components/other',
        meta: {
          order: 100
        },
        exact: true,
        redirect: '/components/other/authorized'
      },
      {
        path: '/components',
        meta: {},
        exact: true,
        redirect: '/components/data-display'
      },
      {
        path: '/zh-CN/components/other',
        meta: {
          order: 100
        },
        exact: true,
        redirect: '/zh-CN/components/other/authorized'
      },
      {
        path: '/zh-CN/components',
        meta: {},
        exact: true,
        redirect: '/zh-CN/components/data-display'
      },
      {
        path: '/components/operation',
        meta: {
          order: 99
        },
        exact: true,
        redirect: '/components/operation/send-code'
      },
      {
        path: '/zh-CN/components/operation',
        meta: {
          order: 99
        },
        exact: true,
        redirect: '/zh-CN/components/operation/send-code'
      },
      {
        path: '/components/data-display',
        meta: {},
        exact: true,
        redirect: '/components/data-display/fit-text'
      },
      {
        path: '/zh-CN/components/data-display',
        meta: {},
        exact: true,
        redirect: '/zh-CN/components/data-display/fit-text'
      },
      {
        path: '/guide',
        meta: {},
        exact: true,
        redirect: '/guide/getting-started'
      },
      {
        path: '/zh-CN/guide',
        meta: {},
        exact: true,
        redirect: '/zh-CN/guide/getting-started'
      }
    ],
    title: 'Ant Design Plus'
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes }
});

export { routes };
