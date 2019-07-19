import React from 'react';
import { graphql } from 'gatsby';
import { Location } from 'history';
import Layout from '@/layout';
import MainContent from '@/components/content/main-content';

export interface IMarkDownFields {
  path: string;
  slug: string;
  modifiedTime: number;
  avatarList: {
    href: string;
    text: string;
    src: string;
  }[];
}

export interface IFrontMatterData extends IMarkDownFields {
  title: {
    'zh-CN': string;
    'en-US': string;
  };
  time: string;
  toc: string | boolean;
  order: number;
  type: string;
  filename: string;
  subtitle: string;
  path: string;
  disabled: boolean;
  important: boolean;
}

export interface IMarkdownRemark {
  html: string;
  fields: IMarkDownFields;
  tableOfContents: string;
  frontmatter: IFrontMatterData;
}

export interface IMenuDataItem extends IFrontMatterData {
  link?: string;
}

export interface IAllMarkdownRemarkData {
  edges: {
    node: {
      frontmatter: IFrontMatterData;
      fields: IMarkDownFields;
    };
  }[];
}

interface IProps {
  data: {
    markdownRemark: IMarkdownRemark;
    allMarkdownRemark: IAllMarkdownRemarkData;
  };
  location: Location;
}

const Template: React.FC<IProps> = (props) => {
  const { data, ...rest } = props;
  const { markdownRemark, allMarkdownRemark } = data;

  const { frontmatter, fields, html, tableOfContents } = markdownRemark;
  const { edges } = allMarkdownRemark;

  const menus = edges.map(({ node }) => {
    const { frontmatter } = node;

    return {
      slug: node.fields.slug,
      meta: {
        ...frontmatter,
        slug: node.fields.slug,
        filename: node.fields.slug,
      },
      ...frontmatter,
      filename: node.fields.path,
    };
  });

  console.log(menus);

  return (
    <Layout>
      <MainContent
        {...rest}
        localizedPageData={{
          meta: {
            ...frontmatter,
            ...fields,
            filename: fields.slug,
            path: fields.path,
          },
          toc: tableOfContents,
          content: html
        }}
        menus={menus}
      />
    </Layout>
  )
};

export default Template;

export const pageQuery = graphql`
  query TemplateDocsMarkdown {
    markdownRemark {
      html
      tableOfContents(maxDepth: 2)
      frontmatter {
        title {
          zh_CN
          en_US
        }
        order
        type
      }
      fields {
        path
        slug
        modifiedTime
      }
    }
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title {
              zh_CN
              en_US
            }
            order
            type
          }
          fields {
            slug
            path
          }
        }
      }
    }
  }
`;
