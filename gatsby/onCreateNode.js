const fs = require(`fs`);
const path = require(`path`);

const getKebabCase = str => {
  return str
    .replace(/[A-Z]/g, letter => {
      return `-${letter.toLowerCase()}`;
    })
    .replace(/\/-/g, '/');
};

module.exports = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const { permalink } = node.frontmatter;
    let slug = permalink;
    const { relativePath, sourceInstanceName } = getNode(node.parent);
    const filePath = path.join(__dirname, '../', sourceInstanceName, relativePath);
    const stats = fs.statSync(filePath);
    const mTime = new Date(stats.mtime).getTime();
    const mdFilePath = path.join(sourceInstanceName, relativePath);

    if (!slug) {
      slug = `${sourceInstanceName}/${relativePath
        .replace('.md', '')}`;
    }

    createNodeField({
      node,
      name: `modifiedTime`,
      value: mTime,
    });

    createNodeField({
      node,
      name: 'slug',
      value: getKebabCase(slug.replace('/index', '')),
    });

    createNodeField({
      node,
      name: 'underScoreCasePath',
      value: slug.replace('/index', ''),
    });

    createNodeField({
      node,
      name: 'path',
      value: mdFilePath,
    });
  }
};
