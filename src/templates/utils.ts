import { IGraphQLFrontMatterData, IFrontMatterData } from './interface';

export const transformerFrontMatter = (
  frontmatter: IGraphQLFrontMatterData
): IFrontMatterData => {
  const { title } = frontmatter;
  return {
    ...frontmatter,
    title: {
      'zh-CN': title.zh_CN,
      'en-US': title.en_US,
    }
  };
};
