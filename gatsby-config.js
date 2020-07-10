require('dotenv').config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: `WpGraphQL Yoast SEO Demo`,
    author: {
      name: `Ash Hitchcock`,
      summary: `Creator of WPGraphQl Yoast SEO Plugin`,
    },
    description: `A starter blog demonstrating what WPGraphQl Yoast SEO Plugin can do.`,
    siteUrl: `https://demo.wpgraphqlseo.com/`,
    social: {
      twitter: `ash_hitchcock`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url: process.env.GATSBY_WORDPRESS_API_URL,
        verbose: true,
        schema: {
          queryDepth: 5,
          typePrefix: `Wp`,
          timeout: 30000,
        },
        develop: {
          nodeUpdateInterval: 3000,
          hardCacheMediaFiles: false,
        },
        production: {
          hardCacheMediaFiles: true,
        },
        debug: {
          // these settings are all the defaults,
          // remove them if you'd like
          graphql: {
            showQueryOnError: false,
            showQueryVarsOnError: true,
            copyQueryOnError: true,
            panicOnError: true,
            // a critical error is a WPGraphQL query that returns an error and no response data. Currently WPGQL will error if we try to access private posts so if this is false it returns a lot of irrelevant errors.
            onlyReportCriticalErrors: true,
          },
        },
        type: {
          Post: {
            limit:
              process.env.NODE_ENV === `development` // Lets just pull 50 posts in development to make it easy on ourselves.
                ? 50 // and we don't actually need more than 5000 in production for this particular site
                : 5000,
          },
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    }, // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    'gatsby-plugin-typescript',
  ],
};
