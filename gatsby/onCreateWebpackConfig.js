const path = require('path');

module.exports = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@site': path.resolve(__dirname, '../src/')
      }
    }
  });
};
