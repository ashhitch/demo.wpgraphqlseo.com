import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import parse from 'html-react-parser';
import { SEOContext } from 'gatsby-plugin-wpgraphql-seo';

const Layout = ({ isHomePage = false, children }) => {
  const {
    wp: {
      seo,
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
          description
        }
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
              sourceUrl
              mediaItemUrl
              altText
            }
          }
          social {
            facebook {
              url
              defaultImage {
                sourceUrl
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
    }
  `);

  return (
    <SEOContext.Provider value={{ global: seo }}>
      <div className="global-wrapper" data-is-root-path={isHomePage}>
        <header className="global-header">
          {isHomePage ? (
            <h1 className="main-heading">
              <Link to="/">{parse(title)}</Link>
            </h1>
          ) : (
            <Link className="header-link-home" to="/">
              {title}
            </Link>
          )}
        </header>

        <main>{children}</main>

        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
          {` `}
          And <a href="https://wordpress.org/">WordPress</a>
        </footer>
      </div>
    </SEOContext.Provider>
  );
};

export default Layout;
