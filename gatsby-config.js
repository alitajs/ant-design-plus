module.exports = {
  siteMetadata: {
    title: `Ant Design Plus`,
    description: `react components`,
    author: `Alita Team`,
    siteUrl: `https://antd-plus.alitajs.com`
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-less',
      options: {
        javascriptEnabled: true,
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
        path: `${__dirname}/docs/`,
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: '/components',
        path: `${__dirname}/components/`,
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
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ant Design Plus`,
        short_name: `AntD Plus`,
        description: `react components`,
        start_url: `/`,
        background_color: `#f7f7f7`,
        theme_color: `#1890ff`,
        display: `standalone`,
        icon: `src/images/favicon.png`
      }
    },
    `gatsby-plugin-sitemap`
  ]
};
