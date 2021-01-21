import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';

// We're using Gutenberg so we need the block styles
import '@wordpress/block-library/build-style/style.css';
import '@wordpress/block-library/build-style/theme.css';

import Seo from 'gatsby-plugin-wpgraphql-seo';
import Bio from '../components/bio';
import Layout from '../components/layout';

const BlogPostTemplate = ({ data: { previous, next, post } }) => {
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

        <hr />

        <footer>
          <Bio />
        </footer>
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

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostById($id: String!, $previousPostId: String, $nextPostId: String) {
    post: wpPost(id: { eq: $id }) {
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
      excerpt
      content
      title
      date(formatString: "DD MMMM, YYYY")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(maxWidth: 1000, quality: 90, layout: FLUID, placeholder: TRACED_SVG)
            }
          }
        }
      }
    }
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`;
