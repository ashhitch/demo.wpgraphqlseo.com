import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { rhythm, scale } from '../utils/typography';

import SEOContext from './SeoContext';

const Layout = ({ location, title, children }) => {
  const { site, wp } = useStaticQuery(
    graphql`
      query {
        wp {
          seo {
            contentTypes {
              post {
                title
                schemaType
                metaRobotsNoindex
                metaDesc
              }
              page {
                metaDesc
                metaRobotsNoindex
                schemaType
                title
              }
            }
            webmaster {
              googleVerify
              yandexVerify
              msVerify
              baiduVerify
            }
            schema {
              companyName
              personName
              companyOrPerson
              wordpressSiteName
              siteUrl
              siteName
              inLanguage
              logo {
                mediaItemUrl
                altText
                localFile {
                  childImageSharp {
                    fixed(width: 1600) {
                      src
                      width
                      height
                    }
                  }
                }
              }
            }

            social {
              facebook {
                url
                defaultImage {
                  mediaItemUrl
                }
              }
              instagram {
                url
              }
              linkedIn {
                url
              }
              mySpace {
                url
              }
              pinterest {
                url
                metaTag
              }
              twitter {
                username
              }
              wikipedia {
                url
              }
              youTube {
                url
              }
            }
          }
        }
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to="/"
        >
          {title}
        </Link>
      </h1>
    );
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to="/"
        >
          {title}
        </Link>
      </h3>
    );
  }

  console.log(JSON.stringify(wp.seo, null, 2));
  return (
    <SEOContext.Provider value={{ global: wp.seo, site }}>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </SEOContext.Provider>
  );
};

export default Layout;
