import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';

// We're using Gutenberg so we need the block styles
import '@wordpress/block-library/build-style/style.css';
import '@wordpress/block-library/build-style/theme.css';

import Seo from 'gatsby-plugin-wpgraphql-seo';
import Layout from '../components/layout';

const PageTemplate = ({ data: { previous, next, post } }) => {
  const featuredImage = {
    img: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  };

  return (
    <Layout>
      <Seo post={post} />

      <article className="blog-post" itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{parse(post.title)}</h1>

          <p>{post.date}</p>

          {/* if we have a featured image for this post let's display it */}
          {featuredImage?.img && (
            <GatsbyImage image={featuredImage.img} alt={featuredImage.alt} style={{ marginBottom: 50 }} />
          )}
        </header>

        {!!post.content && <section itemProp="articleBody">{parse(post.content)}</section>}
      </article>

      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.uri} rel="prev">
                ← {parse(previous.title)}
              </Link>
            )}
          </li>

          <li>
            {next && (
              <Link to={next.uri} rel="next">
                {parse(next.title)} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query PageById($id: String!, $previousPostId: String, $nextPostId: String) {
    post: wpPage(id: { eq: $id }) {
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
        canonical
        cornerstone
        schema {
          articleType
          pageType
          raw
        }
      }
      id
      content
      title
      date(formatString: "DD MMMM, YYYY")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(width: 1000, quality: 100, placeholder: TRACED_SVG, layout: FULL_WIDTH)
            }
          }
        }
      }
    }
    previous: wpPage(id: { eq: $previousPostId }) {
      uri
      title
    }
    next: wpPage(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`;
