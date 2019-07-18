module.exports = ({ stage, actions, loaders }) => {
  actions.setWebpackConfig({
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  });
};
