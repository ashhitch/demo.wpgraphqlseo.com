import React from 'react';
import { Link, graphql } from 'gatsby';
import parse from 'html-react-parser';

import Seo from 'gatsby-plugin-wpgraphql-seo';
import Bio from '../components/bio';
import Layout from '../components/layout';

const BlogIndex = ({ data, pageContext: { nextPagePath, previousPagePath } }) => {
  const posts = data.allWpPost.nodes;
  console.log(data?.wp?.seo?.contentTypes?.post?.schema?.raw);
  if (!posts.length) {
    return (
      <Layout isHomePage>
        <Seo title="All posts" />
        <Bio />
        <p>No blog posts found. Add posts to your WordPress site and they'll appear here!</p>
      </Layout>
    );
  }

  return (
    <Layout isHomePage>
      <Seo
        title="All posts"
        postSchema={
          data?.wp?.seo?.contentTypes?.post?.schema?.raw && JSON.parse(data.wp.seo.contentTypes.post.schema.raw)
        }
      />

      <Bio />

      <ol style={{ listStyle: `none` }}>
        {posts.map((post) => {
          const { title } = post;

          return (
            <li key={post.uri}>
              <article className="post-list-item" itemScope itemType="http://schema.org/Article">
                <header>
                  <h2>
                    <Link to={post.uri} itemProp="url">
                      <span itemProp="headline">{parse(title)}</span>
                    </Link>
                  </h2>
                  <small>{post.date}</small>
                </header>
                <section itemProp="description">{parse(post.excerpt)}</section>
              </article>
            </li>
          );
        })}
      </ol>

      {previousPagePath && (
        <>
          <Link to={previousPagePath}>Previous page</Link>
          <br />
        </>
      )}
      {nextPagePath && <Link to={nextPagePath}>Next page</Link>}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
    wp {
      seo {
        contentTypes {
          post {
            schema {
              raw
            }
          }
        }
      }
    }
    allWpPost(sort: { fields: [date], order: DESC }, limit: $postsPerPage, skip: $offset) {
      nodes {
        excerpt
        uri
        date(formatString: "MMMM DD, YYYY")
        title
        excerpt
      }
    }
  }
`;
