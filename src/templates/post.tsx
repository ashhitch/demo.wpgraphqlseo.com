import React from 'react';
import { Link, graphql } from 'gatsby';

import { formatDistance } from 'date-fns';
import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.wpPost;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO post={post} />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {formatDistance(new Date(post.date), new Date(), { addSuffix: true })}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.content }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio
            name={post.author.node.name}
            avatar={post.author.node.avatar?.url}
            summary={post.author.node.description}
            twitter={post.author.node.seo.social?.twitter}
          />
        </footer>
      </article>

      <nav>
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
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.title} →
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
  query GET_POST($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    wpPost(id: { eq: $id }) {
      id
      title
      content
      uri
      date
      modified
      seo {
        title
        canonical
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
        schema {
          pageType
          articleType
        }
      }
      author {
        node {
          name
          slug
          description
          avatar {
            url
          }
          seo {
            social {
              twitter
            }
          }
        }
      }
      tags {
        nodes {
          name
          link
          uri
        }
      }
      categories {
        nodes {
          name
          link
          uri
        }
      }
    }
  }
`;
