import React from 'react';
import { graphql } from 'gatsby';
import { Location } from 'history';
import * as utils from '../utils';
import Layout from '@site/layout';
import MainContent from '@site/components/content/main-content';
import { IMarkdownRemarkData, IAllMarkdownRemarkData } from './interface';
import { transformerFrontMatter } from './utils';

interface IProps {
  data: {
    markdownRemark: IMarkdownRemarkData;
    allMarkdownRemark: IAllMarkdownRemarkData;
  };
  location: Location;
}

const Template: React.FC<IProps> = props => {
  const { data, ...rest } = props;
  const { markdownRemark, allMarkdownRemark } = data;

  const { frontmatter, fields, html, tableOfContents } = markdownRemark;
  const { edges } = allMarkdownRemark;

  const menus = edges
    .map(({ node }) => {
      const newFrontMatter = transformerFrontMatter(node.frontmatter);

      return {
        slug: node.fields.slug,
        meta: {
          ...newFrontMatter,
          slug: node.fields.slug,
          filename: node.fields.slug,
        },
        ...newFrontMatter,
        filename: node.fields.path,
      };
    })
    .filter(({ slug }) =>
      utils.isZhCN(props.location.pathname) ? slug.includes('cn') : !slug.includes('cn'),
    );

  return (
    <Layout {...rest}>
      <MainContent
        {...rest}
        localizedPageData={{
          meta: {
            ...transformerFrontMatter(frontmatter),
            ...fields,
            filename: fields.slug,
            path: fields.path,
          },
          toc: tableOfContents,
          content: html,
        }}
        menus={menus}
      />
    </Layout>
  );
};

export default Template;

export const pageQuery = graphql`
  query TemplateDocsMarkdown($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
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
        avatarList {
          href
          text
          src
        }
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/docs/" } }
      sort: { fields: [fields___slug, frontmatter___time], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title {
              zh_CN
              en_US
            }
            order
            type
            time
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
