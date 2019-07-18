const path = require('path');

module.exports = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  // 获取模板
  const docsTemplate = path.resolve(__dirname, '../src/templates/docs.tsx');

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
    const { slug, underScoreCasePath } = edge.node.fields;
    const template = docsTemplate;

    const createArticlePage = path => {
      if (underScoreCasePath !== path) {
        redirects[underScoreCasePath] = path;
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
