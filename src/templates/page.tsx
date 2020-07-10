import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

const PageTemplate = ({ data, pageContext, location }) => {
  const page = data.wpPage;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO seo={page.seo} />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {page.title}
          </h1>
        </header>
        <section dangerouslySetInnerHTML={{ __html: page.content }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
      </article>
    </Layout>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query GET_Page($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    wpPage(id: { eq: $id }) {
      id
      title
      content
      uri
      date
      seo {
        title
        metaDesc
        focuskw
        metaKeywords
        metaRobotsNoindex
        metaRobotsNofollow
        opengraphTitle
        opengraphDescription
        opengraphImage {
          altText
          sourceUrl
          srcSet
        }
        twitterTitle
        twitterDescription
        twitterImage {
          altText
          sourceUrl
          srcSet
        }
      }
    }
  }
`;
