type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// 注入MarkDown的字段
interface IMarkDownFields {
  path: string;
  slug: string;
  modifiedTime: number;
  avatarList: {
    href: string;
    text: string;
    src: string;
  }[];
}

// 获取的数据
export interface IFrontMatterData extends IMarkDownFields {
  title: {
    'zh-CN': string;
    'en-US': string;
  };
  time: string;
  toc: string | boolean;
  col: number;
  order: number;
  type: string;
  filename: string;
  subtitle: string;
  path: string;
  disabled: boolean;
  important: boolean;
}

export interface IGraphQLFrontMatterData extends Omit<IFrontMatterData, 'title'> {
  title: {
    zh_CN: string;
    en_US: string;
  };
}

export interface IMarkdownRemarkData {
  html: string;
  description: {
    apiHtml: string;
    descriptionHtml: string;
  };
  tableOfContents: string;
  frontmatter: IGraphQLFrontMatterData;
  fields: IMarkDownFields;
}

export interface IAllMarkdownRemarkData {
  edges: {
    node: {
      frontmatter: IGraphQLFrontMatterData;
      fields: IMarkDownFields;
    };
  }[];
}

export interface IDemo {
  preview: string;
  meta: IFrontMatterData;
}

export interface IGraphQLDemos {
  edges: {
    node: {
      content: string;
      code: string;
      frontmatter: IGraphQLFrontMatterData;
      fields: IMarkDownFields;
    };
  }[]
}

