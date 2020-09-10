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
  seo: any;
}

const capitalise = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const SEO: FC<SeoProps> = ({ seo = {}, lang = 'en', meta = [], title }) => {
  console.log(seo);
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
              personName
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

  const metaTitle = title || seo.title;
  const metaDescription = seo && seo.metaDesc ? seo.metaDesc : site.siteMetadata.description;

  const pageUrl = seo.canonical || `${schema.siteUrl}/${seo.uri}`;

  // const logo = schema.logo && schema.logo.localFile.childImageSharp.fixed;

  const sameAs = Object.entries(social).map(([account, { url, username }]) => {
    if (username || url) {
      return username && account === 'twitter' ? `https://www.twitter.com/${username}` : url;
    }
  });

  const logo = schema.logo
    ? {
        '@type': 'ImageObject',
        '@id': `${schema.siteUrl}/#${schema.companyOrPerson === 'person' ? 'personlogo' : 'logo'}`,
        inLanguage: 'en-GB',
        url: `${schema.siteUrl}${schema.logo?.localFile?.childImageSharp?.fixed.src}`,
        width: schema.logo?.localFile?.childImageSharp?.fixed.width,
        height: schema.logo?.localFile?.childImageSharp?.fixed.height,
        caption: schema.logo.altText,
      }
    : null;

  const image = schema.logo
    ? {
        '@id': `${schema.siteUrl}/#${schema.companyOrPerson === 'person' ? 'personlogo' : 'logo'}`,
      }
    : null;

  const schemaObj = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': schema.companyOrPerson === 'person' ? ['Person', 'Organization'] : 'Organization',
        '@id': `${schema.siteUrl}/#${schema.companyOrPerson === 'person' ? '/schema/person' : 'organization'}`,
        name: schema.siteName,
        url: schema.siteUrl,
        sameAs,
        [schema.companyOrPerson === 'person' ? 'image' : 'logo']: logo,
        [schema.companyOrPerson === 'person' ? 'logo' : 'image']: image,
      },
      {
        '@type': 'WebSite',
        '@id': `${schema.siteUrl}/#website`,
        url: schema.siteUrl,
        name: metaTitle,
        description: metaDescription,
        publisher: {
          '@id': `${schema.siteUrl}/#organization`,
        },
        inLanguage: 'en-GB',
      },
      {
        '@type': seo?.schema?.pageType ? seo.schema.pageType : ['WebPage'],
        '@id': `${pageUrl}#webpage`,
        url: `${pageUrl}`,
        name: seo.title,
        isPartOf: { '@id': `${schema.siteUrl}/#website` },
        primaryImageOfPage: {
          '@id': `${pageUrl}/about#primaryimage`,
        },
        datePublished: '2013-03-15T23:21:12+00:00',
        dateModified: '2020-09-09T18:55:11+00:00',
        description: seo.description,
        breadcrumb: {
          '@id': `${pageUrl}/about#breadcrumb`,
        },
        inLanguage: 'en-GB',
        potentialAction: [
          {
            '@type': 'ReadAction',
            target: [pageUrl],
          },
        ],
      },
    ],
  };

  console.log(schemaObj);
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
      encodeSpecialCharacters={false}
    >
      <script type="application/ld+json">{JSON.stringify(schemaObj)}</script>
    </Helmet>
  );
};

export default SEO;
