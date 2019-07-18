import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layout';

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
  return (
    <Layout>
      <div>
        123
      </div>
    </Layout>
  )
};
