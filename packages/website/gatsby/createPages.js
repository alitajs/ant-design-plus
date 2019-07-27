const { resolve } = require('path');

module.exports = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  // 获取模板
  const docsTemplate = resolve(__dirname, '../src/templates/docs.tsx');
  const componentsTemplate = resolve(__dirname, '../src/templates/components.tsx');

  // Redirect /index.html to root.
  createRedirect({
    fromPath: '/index.html',
    redirectInBrowser: true,
    toPath: '/',
  });

  const allMarkdown = await graphql(
    `
      {
        allMarkdownRemark(
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                path
                slug
                underScoreCasePath
                modifiedTime
              }
            }
          }
        }
      }
    `
  );

  const redirects = {};

  const edges = allMarkdown.data.allMarkdownRemark.edges;

  edges.forEach(edge => {
    const { slug, underScoreCasePath, path } = edge.node.fields;
    if (slug.includes('docs/') || slug.includes('/components')) {
      let template = docsTemplate;

      if (slug.includes('/components')) {
        template = componentsTemplate;
      }

      const createArticlePage = path => {
        if (underScoreCasePath !== path) {
          redirects[underScoreCasePath] = path;
        }

        const demoQuery = slug
          .split('.')
          .shift()
          .split('/')
          .pop();

        if (!slug.includes('demo/')) {
          createPage({
            path: `${path}`,
            component: template,
            context: {
              slug,
              demo: `/${demoQuery}/demo/`,
            },
          });
        }

        return createPage({
          path,
          component: template,
          context: {
            slug,
            // if is docs page
            type: slug.includes('docs/') ? '/docs/' : '/blog/',
          },
        });
      };

      // Register primary URL.
      createArticlePage(slug.replace('/index', ''));
    }
  });

  createRedirect({
    fromPath: '/docs/',
    redirectInBrowser: true,
    toPath: '/docs/getting-started',
  });

  Object.keys(redirects).map(path =>
    createRedirect({
      fromPath: path,
      redirectInBrowser: true,
      toPath: redirects[path]
    })
  );
};
