import React from 'react';
import { graphql } from 'gatsby';
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
  title: string;
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
  tableOfContents: string;
}

interface IProps {
  data: {
    markdownRemark: IMarkdownRemark;
  }
}

const Template: React.FC<IProps> = (props) => {
  const { data, ...rest } = props;
  console.log(data);
  return (
    <Layout>
      <MainContent
        {...rest}
      />
    </Layout>
  )
};

export default Template;

export const pageQuery = graphql`
  query TemplateDocsMarkdown($slug: String!, $type: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      tableOfContents(maxDepth: 2)
      frontmatter {
        order
        type
      }
      fields {
        path
        slug
        modifiedTime
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: $type } }
    ) {
      edges {
        node {
          frontmatter {
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
