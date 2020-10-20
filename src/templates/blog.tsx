/* eslint-disable react/no-danger */
import React from 'react';
import { Link, graphql } from 'gatsby';
import { formatDistance } from 'date-fns';
import Image from 'gatsby-image';
import Layout from '../components/layout';
import SEO from 'gatsby-plugin-wpgraphql-seo';
import { rhythm } from '../utils/typography';

const BlogIndex = ({ data, pageContext: { hasNextPage, pageInt }, location }) => {
  const siteTitle = data.wp.seo.schema.siteName;
  const posts = data.allWpPost.nodes;
  console.log(hasNextPage, pageInt);
  const renderPreviousLink = () => {
    let previousLink;

    if (!pageInt) {
      return null;
    }
    if (pageInt === 1) {
      previousLink = `/`;
    } else if (pageInt > 1) {
      previousLink = `/${pageInt - 1}`;
    }

    return <Link to={previousLink}>Previous</Link>;
  };

  const renderNextLink = () => {
    if (hasNextPage) {
      return <Link to={`/${pageInt ? pageInt + 1 : 2}`}>Next</Link>;
    }
    return null;
  };

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={`${siteTitle} ${pageInt > 1 ? ` | Page ${pageInt}` : ''}`} />

      {posts.map(({ uri, title, date, excerpt, featuredImage }) => (
        <article key={uri}>
          <header
            style={{
              marginBottom: rhythm(1 / 2),
            }}
          >
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: `none` }} to={uri}>
                {title}
              </Link>
            </h3>
            <small>{formatDistance(new Date(date), new Date(), { addSuffix: true })}</small>
          </header>
          <section
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {featuredImage && featuredImage.node && (
              <div
                style={{
                  marginRight: rhythm(1 / 2),
                }}
              >
                <Image fixed={featuredImage.node.localFile.childImageSharp.fixed} alt={featuredImage.node.altText} />
              </div>
            )}
            <p
              dangerouslySetInnerHTML={{
                __html: excerpt,
              }}
            />
          </section>
        </article>
      ))}

      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {renderPreviousLink()}
        {renderNextLink()}
      </div>
    </Layout>
  );
};

export default BlogIndex;

export const query = graphql`
  query GET_POSTS($ids: [String]) {
    wp {
      seo {
        schema {
          siteName
        }
      }
    }
    allWpPost(filter: { id: { in: $ids } }) {
      nodes {
        id
        title
        uri
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            mediaItemUrl
            altText
            localFile {
              childImageSharp {
                fixed(width: 180, height: 180, quality: 80) {
                  ...GatsbyImageSharpFixed_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;
