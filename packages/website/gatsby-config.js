const path = require('path');

module.exports = {
  siteMetadata: {
    title: `Ant Design Plus`,
    description: `react components`,
    author: `Alita Team`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-less',
      options: {
        javascriptEnabled: true,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
    `gatsby-plugin-typescript`,
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: '/docs',
        path: path.join(__dirname, '..', '..', 'docs'),
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: '/components',
        path: path.join(__dirname, '..', 'components')
      }
    },
    {
      resolve: 'gatsby-transformer-remark-antd',
      options: {
        plugins: [
          'gatsby-remark-header-custom-ids',
          'gatsby-remark-img-warpper-p',
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              noInlineHighlight: true,
            },
          },
        ],
      },
    }
  ]
};
