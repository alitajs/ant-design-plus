module.exports = ({ stage, actions, loaders }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [],
      },
    });
    return;
  }
  actions.setWebpackConfig({
    externals: {
      // react: 'React',
      // 'react-dom': 'ReactDOM',
    },
  });
};
