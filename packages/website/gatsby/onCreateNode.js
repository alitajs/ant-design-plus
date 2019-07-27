const fs = require(`fs`);
const path = require(`path`);
const fetch = require('node-fetch');
const himalaya = require('himalaya');

// 获取用户的头像列表
const getAvatarList = async filename => {
  const sourcePath = 'https://github.com/alitajs/ant-design-plus/contributors/master';
  const url = `${sourcePath}${filename}/list`;
  const html = await fetch(url).then(res => res.text());
  const ast = himalaya.parse(html)[0].children || [];
  return ast
    .map(item => {
      if (item.type === 'element') {
        const AlinkAST = item.children[1];
        const href = AlinkAST.attributes.find(({ key }) => key === 'href').value;
        const img = AlinkAST.children[1];
        const text = AlinkAST.children[2].content;
        const src = img.attributes.find(({ key }) => key === 'src').value;
        return {
          href,
          text,
          src,
        };
      }
      return null;
    })
    .filter(item => item && item.src);
};

const getKebabCase = str => {
  return str
    .replace(/[A-Z]/g, letter => {
      return `-${letter.toLowerCase()}`;
    })
    .replace(/\/-/g, '/');
};

module.exports = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  switch (node.internal.type) {
    case 'MarkdownRemark':
      const { permalink } = node.frontmatter;
      let slug = permalink;
      const { absolutePath, sourceInstanceName, relativePath } = getNode(node.parent);
      const stats = fs.statSync(absolutePath);
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

      const html = await getAvatarList(mdFilePath);
      createNodeField({
        node,
        name: 'avatarList',
        value: html || [],
      });
  }
};
