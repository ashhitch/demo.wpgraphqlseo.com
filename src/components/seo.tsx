/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 */

import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface MetaProps {
  name?: string;
  property?: string;
  content: string;
}
interface SeoProps {
  title?: String;
  lang?: String;
  meta?: MetaProps[];
  seo?: any;
}

const SEO: FC<SeoProps> = ({ seo = {}, lang = 'en', meta = [], title }) => {
  const { site, wp } = useStaticQuery(
    graphql`
      query {
        wp {
          seo {
            webmaster {
              googleVerify
              yandexVerify
              msVerify
              baiduVerify
            }
            schema {
              companyName
              companyOrPerson
              wordpressSiteName
              siteUrl
              siteName
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

  const { schema, webmaster, social } = wp.seo;
  //  console.log({ schema, webmaster, social });

  const verification: MetaProps[] = [];

  if (webmaster.baiduVerify) {
    verification.push({
      name: `baidu-site-verification`,
      content: webmaster.baiduVerify,
    });
  }
  if (webmaster.googleVerify) {
    verification.push({
      name: `google-site-verification`,
      content: webmaster.googleVerify,
    });
  }
  if (webmaster.msVerify) {
    verification.push({
      name: `msvalidate.01`,
      content: webmaster.msVerify,
    });
  }
  if (webmaster.yandexVerify) {
    verification.push({
      name: `yandex-verification`,
      content: webmaster.yandexVerify,
    });
  }
  if (social.pinterest && social.pinterest.metaTag) {
    verification.push({
      name: `p:domain_verify`,
      content: social.pinterest.metaTag,
    });
  }

  const metaDescription = seo && seo.metaDesc ? seo.metaDesc : site.siteMetadata.description;
  const metaTitle = title || seo.title;

  // const logo = schema.logo && schema.logo.localFile.childImageSharp.fixed;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      meta={[
        {
          name: `robots`,
          content: `max-snippet:-1, max-image-preview:large, max-video-preview:-1`,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:site_name`,
          content: schema.companyName,
        },
        {
          property: `og:title`,
          content: seo.opengraphTitle || metaTitle,
        },
        {
          property: `og:description`,
          content: seo.opengraphDescription,
        },
        {
          property: `og:locale`,
          content: `en_GB`,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: social.twitter.cardType,
        },
        {
          name: `twitter:creator`,
          content: social.twitter.username,
        },
        {
          name: `twitter:title`,
          content: seo.twitterTitle || metaTitle,
        },
        {
          name: `twitter:description`,
          content: seo.twitterDescription || metaDescription,
        },
      ]
        .filter((m) => !!m.content)
        .concat(meta, verification)}
    />
  );
};

export default SEO;
